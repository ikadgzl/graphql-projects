import { Post } from '@prisma/client';
import { Context } from '../index';

interface PostArgs {
  input: {
    title: string;
    content: string;
  };
}

interface PostPayload {
  userErrors: {}[];
  post: Post | null;
}

export const Mutation = {
  postCreate: async (
    _,
    { input }: PostArgs,
    { prisma }: Context
  ): Promise<PostPayload> => {
    const { title, content } = input;

    if (!title || !content) {
      return {
        userErrors: [{ message: 'Please provide content or title.' }],
        post: null
      };
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: 1
      }
    });

    return {
      userErrors: null,
      post
    };
  },

  postUpdate: async (
    _,
    { postId, input }: { postId: string; input: PostArgs['input'] },
    { prisma }: Context
  ): Promise<PostPayload> => {
    const { title, content } = input;

    if (!title || !content) {
      return {
        userErrors: [{ message: 'Please provide content or title.' }],
        post: null
      };
    }

    const existingPost = await prisma.post.findUnique({
      where: {
        id: Number(postId)
      }
    });

    if (!existingPost) {
      return {
        userErrors: [{ message: 'Post does not exist.' }],
        post: null
      };
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: Number(postId)
      },
      data: input
    });

    return {
      userErrors: null,
      post: updatedPost
    };
  },

  postDelete: async (
    _,
    { postId }: { postId: string },
    { prisma }: Context
  ): Promise<PostPayload> => {
    const existingPost = await prisma.post.findUnique({
      where: {
        id: Number(postId)
      }
    });

    if (!existingPost) {
      return {
        userErrors: [{ message: 'Post does not exist.' }],
        post: null
      };
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: Number(postId)
      }
    });

    return {
      userErrors: null,
      post: deletedPost
    };
  }
};
