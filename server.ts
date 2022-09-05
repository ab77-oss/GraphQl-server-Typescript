import express from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const app = express();


const schema = makeExecutableSchema({ typeDefs:typeDefs, resolvers:resolvers })

let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
        schema:schema,
        context:({req,res}:any) => ({req,res})
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    const httpServer = http.createServer(app);
    app.listen({ port: 8000 }, () => {
        console.log("GraphQL server ready on port 8000");
    });
}
startServer();









export default apolloServer;

