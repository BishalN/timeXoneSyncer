import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { helloResolver } from "./resolvers/hello";
import passport from "passport";
import dotenv from "dotenv";
import { Strategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";

import { createConnection } from "typeorm";
import { User } from "./entity/User";

dotenv.config();

const main = async () => {
  const connection = await createConnection();

  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_CALLBACK_URL!,
        scope: ["profile", "email", "openid"],
      },
      async (_, __, profile, cb) => {
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

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID as string,
        clientSecret: process.env.FACEBOOK_APP_SECRET as string,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL as string,
      },
      function (accessToken, refreshToken, profile, cb) {
        console.log(profile);

        return cb(null, profile);
      }
    )
  );

  const app = express();

  app.use(passport.initialize());

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email", "openid"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: process.env.LOGIN_URL,
      session: false,
    }),
    (req, res) => {
      //@todo store the users session id in redis   (req.session as any).userId = (req.user as any).id;
      console.log((req.user as any).id);
      res.redirect(process.env.LOGIN_SUCCESS_URL as string);
    }
  );

  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      session: false,
      scope: ["email,profile_picture"],
    })
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      failureRedirect: process.env.LOGIN_URL,
    }),
    function (req, res) {
      //@todo store the users session id in redis   (req.session as any).userId = (req.user as any).id;
      res.redirect(process.env.LOGIN_SUCCESS_URL as string);
    }
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [helloResolver], validate: false }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: { origin: "http://localhost:4000" },
  });

  app.listen(process.env.PORT || 4000, () => {
    console.log("timeXoneSyncer running on port 4000 !!");
  });
};

main();
