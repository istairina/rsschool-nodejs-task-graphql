import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const userType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        balance: {type: new GraphQLNonNull(GraphQLFloat)},
    })
})