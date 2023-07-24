import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const profileType = new GraphQLObjectType({
    name: "Profile",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        isMale: {type: new GraphQLNonNull(GraphQLBoolean)},
        yearOfBirth: {type: new GraphQLNonNull(GraphQLInt)},
        userId: {type: new GraphQLNonNull(GraphQLString)},
        // memberTypeId: "basic",
    })
})