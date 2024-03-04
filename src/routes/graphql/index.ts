import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import gqlSchema, { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLError, graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

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
      try {
        const validationErrors = validate(gqlSchema, parse(req.body.query), [
          depthLimit(5),
        ]);

        if (validationErrors.length > 0) {
          return { errors: validationErrors };
        }

        const { data, errors } = await graphql({
          schema: gqlSchema,
          source: req.body.query,
          variableValues: req.body.variables,
          contextValue: {
            prisma: fastify.prisma,
          },
        });
        return { data, errors };
      } catch (error: unknown) {
        if (error instanceof GraphQLError) {
          console.error('GraphQL error:', error.message);
          return { errors: [error] };
        } else {
          return { errors: [error] };
        }
      }
    },
  });
};

export default plugin;
