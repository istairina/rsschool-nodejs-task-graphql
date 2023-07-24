import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "./UUIDType.js";

export const profileType = new GraphQLObjectType({
    name: "Profile",
    fields: () => ({
        id: {type: new GraphQLNonNull(UUIDType)},
        isMale: {type: new GraphQLNonNull(GraphQLBoolean)},
        yearOfBirth: {type: new GraphQLNonNull(GraphQLInt)},
        userId: {type: new GraphQLNonNull(UUIDType)},
        // memberTypeId: "basic",
    })
})