var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { helloResolver } from './resolvers/hello.js';
export const sum = (a, b) => {
    return a + b;
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express();
    const apolloServer = new ApolloServer({
        schema: yield buildSchema({ resolvers: [helloResolver], validate: false }),
    });
    apolloServer.applyMiddleware({
        app,
        cors: { origin: 'http://localhost:3000' },
    });
    app.listen(4000, () => {
        console.log('timeXoneSyncer running on port 4000 !!');
    });
});
main();
//# sourceMappingURL=index.js.map