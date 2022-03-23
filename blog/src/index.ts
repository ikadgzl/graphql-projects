import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { Query, Mutation } from './resolvers';
import { Prisma, PrismaClient } from '@prisma/client';
import { getUserFromToken } from './utils/getUserFromToken';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;
  userInfo: {
    userId: number;
  } | null;
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation
  },
  context: ({ req }: any): Context => {
    const userInfo = getUserFromToken(req.headers.authorization);

    return {
      prisma,
      userInfo
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`server listening at url ${url}`);
});
