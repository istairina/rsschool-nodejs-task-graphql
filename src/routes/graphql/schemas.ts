import { Type } from '@fastify/type-provider-typebox';
import {
  GraphQLFieldConfig,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import { userType } from './types/userType.js';
import { postType } from './types/postType.js';
import { profileType } from './types/profileType.js';
// import { memberType } from './types/memberType';
import { MemberTypeId, MemberTypeIdType, memberType } from './types/MemberType.js';
import { PrismaClient } from '@prisma/client';
import { UserArgs } from '@prisma/client/runtime/library.js';
// import { MemberTypeId } from '../member-types/schemas.js';

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

export interface GraphQLContext {
  prisma: PrismaClient;
}

const usersResolver: GraphQLFieldConfig<undefined, GraphQLContext, UserArgs> = {
  type: new GraphQLList(new GraphQLNonNull(userType)),
  resolve: async (_, __, { prisma }) => {
    return prisma.user.findMany();
  },
};

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args: { id: string }, { prisma }: GraphQLContext) => {
        return prisma.user.findUnique({ where: { id: args.id } });
      },
    },
    users: usersResolver,
    post: {
      type: postType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args: { id: string }, { prisma }: GraphQLContext) => {
        return prisma.post.findUnique({ where: { id: args.id } });
      },
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: async (_, __, { prisma }: GraphQLContext) => {
        return prisma.post.findMany();
      },
    },
    profile: {
      type: profileType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args: { id: string }, { prisma }: GraphQLContext) => {
        return prisma.profile.findUnique({ where: { id: args.id } });
      },
    },
    profiles: {
      type: new GraphQLList(profileType),
      resolve: async (_, __, { prisma }: GraphQLContext) => {
        return prisma.profile.findMany();
      },
    },
    memberType: {
      type: memberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeIdType) },
      },
      resolve: async (_, args: { id: MemberTypeId }, { prisma }: GraphQLContext) => {
        return prisma.memberType.findUnique({ where: { id: args.id } });
      },
    },
    memberTypes: {
      type: new GraphQLList(memberType),
      resolve: async (_, __, { prisma }: GraphQLContext) => {
        return prisma.memberType.findMany();
      },
    },
  },
});

const gqlSchema = new GraphQLSchema({
  query,
});

export default gqlSchema;
