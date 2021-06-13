"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const typeorm_1 = require("typeorm");
dotenv_1.default.config();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, function (accessToken, refreshToken, profile, cb) {
    console.log(accessToken, refreshToken, profile);
    console.log(cb);
}));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection();
    const app = express_1.default();
    app.use(passport_1.default.initialize());
    app.get("/auth/google", passport_1.default.authenticate("google", { scope: ["profile"] }));
    app.get("/auth/google/callback", passport_1.default.authenticate("google", {
        failureRedirect: process.env.LOGIN_URL,
        session: false,
    }), function (req, res) {
        console.log(req);
        res.redirect(process.env.LOGIN_SUCCESS_URL);
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({ resolvers: [hello_1.helloResolver], validate: false }),
    });
    apolloServer.applyMiddleware({
        app,
        cors: { origin: "http://localhost:4000" },
    });
    app.listen(process.env.PORT || 4000, () => {
        console.log("timeXoneSyncer running on port 4000 !!");
    });
});
main();
//# sourceMappingURL=index.js.map