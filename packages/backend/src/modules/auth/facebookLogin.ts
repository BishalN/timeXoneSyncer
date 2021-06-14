import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import axios from "axios";
import { config } from "../../utils/createDotEnvConfig";
import express from "express";
import { User } from "../../entity/User";
import { getConnection } from "typeorm";

const router = express.Router();
config();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_SECRET as string,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL as string,
    },
    async (accessToken, _, profile, cb) => {
      const {
        _json: { id },
      } = profile;

      let graphqlUrl = `https://graph.facebook.com/v9.0/${id}/?fields=id,name,email,picture&access_token=${accessToken}`;

      const { data } = await axios.get(graphqlUrl);

      const {
        name,
        email,
        picture: {
          data: { url },
        },
      } = data;

      const connection = getConnection();

      let userQuery = connection
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.facebookId =:id", { id });

      if (email) {
        userQuery.orWhere("user.email =:email", { email });
      }

      let user = await userQuery.getOne();

      //Register the user
      if (!user) {
        user = User.create({
          facebookId: id,
          profilePicture: url,
          username: name,
          email,
        });
        await user.save();
      } else if (!user.facebookId) {
        //merge account we found the user by email
        user.facebookId = id;
        await user.save();
      } else {
        //log the user in
      }

      return cb(null, { id: user.id });
    }
  )
);

router.get("/", passport.authenticate("facebook"));

router.get(
  "/callback",
  passport.authenticate("facebook", {
    failureRedirect: process.env.LOGIN_URL,
    session: false,
  }),
  function (req, res) {
    //@todo store the users session id in redis   (req.session as any).userId = (req.user as any).id;
    res.redirect(process.env.LOGIN_SUCCESS_URL as string);
  }
);

export { router };
