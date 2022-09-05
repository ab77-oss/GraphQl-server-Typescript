import {IResolvers} from '@graphql-tools/utils';
import { v4 } from 'uuid';
import { todos } from './db';
import {GqlContext} from "./GqlContext";
import {PubSub} from 'graphql-subscriptions';

interface User {
    id:string;
    username:string;
    description?:string;
}

interface Todo {
    id:string;
    title:string;
    description?:string;
}
const NEW_TODO = "NEW TODO";

const resolvers: IResolvers = {
    Query: {
        getUser: async (
            obj:any,
            args: {
                id:string;   
            },
            ctx:GqlContext,
            info:any
        ): Promise<User> => {
            return {
                id:v4(),
                username:"dave"
            };
        },

        getTodos: async (
            parent:any,
            args:null,
            ctx:GqlContext,
            info:any
            ): Promise<Array<Todo>> => {
                return [
                    {
                        id:v4(),
                        title:"First todo",
                        description:"First todo description",
                    },
                    {
                        id:v4(),
                        title:"second todo",
                        description:"Second todo description",
                    },
                    {
                        id:v4(),
                        title:"Third",
                
                    }
                ]
            }
        
    },
    Mutation: {
        addTodo: async (
            parent:any,
            args:{
                title:string;
                description:string;
            },
            ctx:GqlContext,
            info:any
        ): Promise<Todo> => {
            todos.push({
                id:v4(),
                title:args.title,
                description:args.description
            });
            return todos[todos.length - 1]
        },
    },

}


export default resolvers;