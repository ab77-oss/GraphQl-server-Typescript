import {gql} from "apollo-server-express";

// The GraphQL Schema Definition Language, or SDL

const typeDefs = gql`
    type User {
        id:ID!
        username:String!
        email:String
    }

    type Todo {
        id:ID!
        title:String!
        description:String
    }

    type Query {
        getUser(id:ID): User
        getTodos : [Todo!]
    }

    type Mutation {
        addTodo(title:String!, description:String):Todo
    }

`;

export default typeDefs;