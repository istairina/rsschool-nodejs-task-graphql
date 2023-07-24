import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { profileType } from "./profileType.js";

export const MemberTypeId = new GraphQLEnumType({
    name: "MemberTypeId",
    values: {
        basic: {value: "basic"},
        business: {value: "business"},
    }
})

export const memberType = new GraphQLObjectType({
    name: "Member",
    fields: () => ({
        id: {type: MemberTypeId},
        discount: {type: new GraphQLNonNull(GraphQLFloat)},
        postsLimitPerMonth: {type: new GraphQLNonNull(GraphQLInt)},
        profiles: {
            type: new GraphQLList(profileType),
        }
    })
})