import { Type } from '@fastify/type-provider-typebox';
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { userType } from './types/userType.js';
import { postType } from './types/postType.js';
import { profileType } from './types/profileType.js';
import { memberType } from './types/memberType.js';
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

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)}
      }
    },
    users: {
      type: new GraphQLList(userType)
    },
    post: {
      type: postType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
      }
    },
    posts: {
      type: new GraphQLList(postType),
    },
    profile: {
      type: profileType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
      }
    },
    profiles: {
      type: new GraphQLList(profileType),
    },
    memberType: {
      type: memberType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
      }
    },
    memberTypes: {
      type: new GraphQLList(memberType),
    }
  }
})

const schema = new GraphQLSchema({
  query: Query, 
});

export default schema;

