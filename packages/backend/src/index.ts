import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { helloResolver } from "./resolvers/hello";
import passport from "passport";

import { router as googleAuthHandler } from "./modules/auth/googleLogin";
import { router as facebookAuthHandler } from "./modules/auth/facebookLogin";
import { router as discordAuthHandler } from "./modules/auth/discordLogin";
import { createTypeormConnection } from "./utils/createDatabasecConnection";
import { config } from "./utils/createDotEnvConfig";

const main = async () => {
  config();
  await createTypeormConnection();

  const app = express();

  app.use(passport.initialize());

  app.use("/auth/google", googleAuthHandler);
  app.use("/auth/facebook", facebookAuthHandler);
  app.use("/auth/discord", discordAuthHandler);

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
