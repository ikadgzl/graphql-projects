import { ApolloServer, gql } from 'apollo-server';
import { products } from './data.js';

const typeDefs = gql`
  type Query {
    product(id: ID!): Product
    products: [Product!]!
  }

  type Product {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
  }
`;

const resolvers = {
  Query: {
    product: (parent, args, context) => {
      const productId = args.id;

      const product = products.find((product) => product.id === productId);

      if (!product) return null;

      return product;
    },
    products: () => products,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log('server is up and running', url);
});
