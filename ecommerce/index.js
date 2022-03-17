import { ApolloServer } from 'apollo-server';
import { Category } from './resolvers/Category.js';
import { Product } from './resolvers/Product.js';
import { Query } from './resolvers/Query.js';
import { typeDefs } from './schema.js';
import { products, categories, reviews } from './data.js';

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Product,
    Category,
  },
  context: {
    products,
    categories,
    reviews,
  },
});

server.listen(4001).then(({ url }) => {
  console.log('server is up and running', url);
});
