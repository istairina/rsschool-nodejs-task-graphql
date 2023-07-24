import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import schema, { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { buildSchema, graphql } from 'graphql';
import { PrismaClient } from '@prisma/client';



const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
    //   const gqlSchema = buildSchema(`query ($userId: UUID!) {
    //     user(id: $userId) {
    //         id
    //         profile {
    //             id
    //             memberType {
    //                 id
    //             }
    //         }
    //         posts {
    //             id
    //         }
    //     }
    // }`);
      const {data, errors} = await graphql({
        schema: schema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: {
          prisma: PrismaClient
        }
      })
      return { data, errors};
    },
  });
};

export default plugin;
