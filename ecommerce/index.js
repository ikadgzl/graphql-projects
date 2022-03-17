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
    category: Category
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]!
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

      if (!category) return null;

      return category;
    },
  },

  Product: {
    category: (parent, args, context) => {
      console.log(parent, args, context);

      const { categoryId } = parent;

      const category = categories.find(
        (category) => category.id === categoryId
      );

      if (!category) return null;

      return category;
    },
  },

  Category: {
    products: (parent, args, context) => {
      const categoryId = parent.id;
      const productsOfCategory = products.filter(
        (product) => product.categoryId === categoryId
      );

      if (!productsOfCategory) return null;

      return productsOfCategory;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4001).then(({ url }) => {
  console.log('server is up and running', url);
});
