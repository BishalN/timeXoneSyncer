import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { User } from "../../entity/User";

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      scope: ["profile", "email", "openid"],
    },
    async (req, res, profile, cb) => {
      const {
        _json: { email, name, picture, sub: id },
      } = profile;

      let user = await User.findOne({ where: { email } });

      //we need to register user
      if (!user) {
        const user = User.create({
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
