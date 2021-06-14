import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import { getConnection } from "typeorm";
import { User } from "../../entity/User";
import express from "express";

const router = express.Router();

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      callbackURL: process.env.DISCORD_CALLBACK_URL as string,
      scope: ["identify,email"],
    },
    async (_, __, profile, cb) => {
      const { id, username, email, avatar } = profile;
      const profilePictureUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}`;

      const connection = getConnection();

      let userQuery = connection
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.discordId =:id", { id });

      if (email) {
        userQuery.orWhere("user.email =:email", { email });
      }

      let user = await userQuery.getOne();

      //Register the user
      if (!user) {
        user = User.create({
          email,
          username,
          profilePicture: profilePictureUrl,
          discordId: id,
        });
        await user.save();
      } else if (!user.discordId) {
        //merge the account we found the user by email
        user.discordId = id;
        await user.save();
      } else {
        //log the user in
      }

      return cb(null, { id: user.id });
    }
  )
);

router.get(
  "/",
  passport.authenticate("discord", { scope: ["identify", "email"] })
);
router.get(
  "/callback",
  passport.authenticate("discord", {
    failureRedirect: process.env.LOGIN_URL,
    session: false,
  }),
  (req, res) => {
    (req.session as any).userId = (req.user as any).id;

    res.redirect(process.env.LOGIN_SUCCESS_URL as string); // Successful auth
  }
);

export { router };
