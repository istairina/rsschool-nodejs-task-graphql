import { GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const memberType = new GraphQLObjectType({
    name: "Member",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        discount: {type: new GraphQLNonNull(GraphQLFloat)},
        postsLimitPerMonth: {type: new GraphQLNonNull(GraphQLInt)}
    })
})