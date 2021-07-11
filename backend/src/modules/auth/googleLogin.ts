import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { User } from "../../entity/User";
import express from "express";
import { isProd } from "../../utils/isProd";

const router = express.Router();
passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: isProd
        ? process.env.GOOGLE_CALLBACK_URL
        : process.env.GOOGLE_CALLBACK_URL_DEV,
      scope: ["profile", "email", "openid"],
    },
    async (req, res, profile, cb) => {
      const {
        _json: { email, name, picture, sub: id },
      } = profile;

      let user = await User.findOne({ where: { email } });

      //we need to register user
      if (!user) {
        user = User.create({
          email,
          googleId: id,
          username: name,
          profilePicture: picture,
        });

        await user.save();
      } else if (!user.googleId) {
        //merge the account
        user.googleId = id;
        await user.save();
      } else {
        //log the user in
      }

      return cb(null, { id: user?.id });
    }
  )
);

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email", "openid"] })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.LOGIN_URL,
    session: false,
  }),
  (req, res) => {
    (req.session as any).userId = (req.user as any).id;

    res.redirect(
      isProd ? process.env.LOGIN_SUCCESS_URL : process.env.LOGIN_SUCCESS_URL_DEV
    );
  }
);
export { router };
