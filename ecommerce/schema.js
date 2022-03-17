import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    product(id: ID!): Product
    products(filter: ProductsFilterInput): [Product!]!
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
    review: [Review!]!
  }

  type Category {
    id: ID!
    name: String!
    products(filter: ProductsFilterInput): [Product!]!
  }

  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
  }

  input ProductsFilterInput {
    onSale: Boolean
    avgRating: Int
  }
`;
