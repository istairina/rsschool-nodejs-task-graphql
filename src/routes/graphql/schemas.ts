import { Type } from '@fastify/type-provider-typebox';
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';
// import { memberType } from './types/MemberType.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

// const query = new GraphQLObjectType({
//   name: "Query",
//   fields: {
//     user: {
//       type: userType,
//       args: {
//         id: { type: new GraphQLNonNull(UUIDType) },
//       },
//     },
//     users: {
//       type: new GraphQLList(userType),
//     },
//     memberType: {
//       type: memberType,
//       args: {
//         id: { type: new GraphQLNonNull(memberTypeIdEnum) },
//       },
//     },
//     memberTypes: {
//       type: new GraphQLList(memberType),
//     },
//     post: {
//       type: postType,
//       args: {
//         id: { type: new GraphQLNonNull(UUIDType) },
//       },
//     },
//     posts: {
//       type: new GraphQLList(postType),
//     },
//     profile: {
//       type: profileType,
//       args: {
//         id: { type: new GraphQLNonNull(UUIDType) },
//       },
//     },
//     profiles: {
//       type: new GraphQLList(profileType),
//     },
//   },
// });

// export const gqlSchema = new GraphQLSchema({
//   query
// });

// type Query {
  
// }
