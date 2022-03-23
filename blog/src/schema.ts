import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    posts: [Post]!
  }

  type Mutation {
    postCreate(input: PostInput!): PostPayload!
    postUpdate(postId: ID!, input: PostInput!): PostPayload!
    postDelete(postId: ID!): PostPayload!

    signup(
      credentials: CredentialsInput!
      name: String!
      bio: String!
    ): AuthPayload!
    signin(credentials: CredentialsInput!): AuthPayload!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    profile: Profile!
    posts: [Post]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    published: Boolean!
    user: User!
  }

  type Profile {
    id: ID!
    bio: String!
    user: User!
  }

  type UserError {
    message: String!
  }

  type PostPayload {
    userErrors: [UserError]
    post: Post
  }

  type AuthPayload {
    userErrors: [UserError]
    token: String
  }

  input CredentialsInput {
    email: String!
    password: String!
  }

  input PostInput {
    title: String!
    content: String!
  }
`;
