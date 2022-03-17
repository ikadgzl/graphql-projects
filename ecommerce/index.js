import { ApolloServer, gql } from 'apollo-server';
import { categories, products } from './data.js';

const typeDefs = gql`
  type Query {
    product(id: ID!): Product
    products: [Product!]!
    category(id: ID!): Category
    categories: [Category!]!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
  }

  type Category {
    id: ID!
    name: String!
  }
`;

const resolvers = {
  Query: {
    products: () => products,
    product: (parent, args, context) => {
      const productId = args.id;

      const product = products.find((product) => product.id === productId);

      if (!product) return null;

      return product;
    },
    categories: () => categories,
    category: (parent, args, context) => {
      const categoryId = args.id;

      const category = categories.find(
        (category) => category.id === categoryId
      );

      console.log(category);

      if (!category) return null;

      return category;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(2132).then(({ url }) => {
  console.log('server is up and running', url);
});
