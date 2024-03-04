import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './UUIDType.js';
import { GraphQLContext } from '../schemas.js';

export const userType: GraphQLObjectType<
  { id: string; name: string; balance: number },
  GraphQLContext
> = new GraphQLObjectType<{ id: string; name: string; balance: number }, GraphQLContext>({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});
