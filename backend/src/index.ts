import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { helloResolver } from './resolvers/hello.js';

const app = express();

const apolloServer = new ApolloServer({
  schema: await buildSchema({ resolvers: [helloResolver], validate: false }),
});

apolloServer.applyMiddleware({
  app,
  cors: { origin: 'http://localhost:3000' },
});

app.listen(4000, () => {
  console.log('App is running on port 4000');
});
