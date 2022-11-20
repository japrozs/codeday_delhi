"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv-safe/config");
const constants_1 = require("./constants");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const user_1 = require("./resolvers/user");
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const path_1 = __importDefault(require("path"));
const service_1 = require("./resolvers/service");
const Service_1 = require("./entities/Service");
const avatar_1 = __importDefault(require("./resolvers/upload/avatar"));
const main = async () => {
    const conn = await (0, typeorm_1.createConnection)({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        synchronize: true,
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        entities: [User_1.User, Service_1.Service],
    });
    await conn.runMigrations();
    const app = (0, express_1.default)();
    app.use("/storage", express_1.default.static("/Users/pritpalsinghsaini/coding/programming/proj/packages/server/storage/"));
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redis = new ioredis_1.default(process.env.REDIS_URL);
    app.set("trust proxy", 1);
    app.use((0, cors_1.default)({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }));
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            secure: false,
            domain: undefined,
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [user_1.UserResolver, service_1.ServiceResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis,
        }),
    });
    app.use("/upload/", avatar_1.default);
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    app.listen(parseInt(process.env.PORT), () => {
        console.log(`🚀 Server started on localhost:${process.env.PORT}`);
    });
};
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map