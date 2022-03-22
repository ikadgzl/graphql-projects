import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { Query, Mutation } from './resolvers';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation
  },
  context: {
    prisma
  }
});

server.listen().then(({ url }) => {
  console.log(`server listening at url ${url}`);
});
