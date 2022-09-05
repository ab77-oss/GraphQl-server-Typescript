"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("@graphql-tools/schema");
const typeDefs_1 = __importDefault(require("./typeDefs"));
const resolvers_1 = __importDefault(require("./resolvers"));
const app = (0, express_1.default)();
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: typeDefs_1.default, resolvers: resolvers_1.default });
let apolloServer = null;
async function startServer() {
    apolloServer = new apollo_server_express_1.ApolloServer({
        schema: schema,
        context: ({ req, res }) => ({ req, res })
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    const httpServer = http_1.default.createServer(app);
    app.listen({ port: 8000 }, () => {
        console.log("GraphQL server ready on port 8000");
    });
}
startServer();
exports.default = apolloServer;
