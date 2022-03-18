import { ApolloServer } from 'apollo-server';
import { Category } from './resolvers/Category.js';
import { Product } from './resolvers/Product.js';
import { Query } from './resolvers/Query.js';
import { typeDefs } from './schema.js';
import db from './data.js';
import { Mutation } from './resolvers/Mutation.js';

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Product,
    Category,
  },
  context: {
    db,
  },
});

server.listen(4001).then(({ url }) => {
  console.log('server is up and running', url);
});
