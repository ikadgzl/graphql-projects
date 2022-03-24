import { Post } from '@prisma/client';
import { Context } from '../..';
import { canUserMutatePost } from '../../utils/canUserMutatePost';

interface PostArgs {
  input: {
    title: string;
    content: string;
  };
}

interface PostPayload {
  userErrors:
    | {
        message: string;
      }[]
    | null;
  post: Post | null;
}

export const postCreate = async (
  _: any,
  { input }: PostArgs,
  { prisma, userInfo }: Context
): Promise<PostPayload> => {
  if (!userInfo) {
    return {
      userErrors: [{ message: 'Unauthorized.' }],
      post: null
    };
  }

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
      authorId: userInfo.userId
    }
  });

  return {
    userErrors: null,
    post
  };
};

export const postUpdate = async (
  _: any,
  { postId, input }: { postId: string; input: PostArgs['input'] },
  { prisma, userInfo }: Context
): Promise<PostPayload> => {
  if (!userInfo) {
    return {
      userErrors: [{ message: 'Unauthorized.' }],
      post: null
    };
  }

  const error = await canUserMutatePost({
    userId: userInfo.userId,
    postId: Number(postId),
    prisma
  });

  if (error) return error;

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
};

export const postDelete = async (
  _: any,
  { postId }: { postId: string },
  { prisma, userInfo }: Context
): Promise<PostPayload> => {
  if (!userInfo) {
    return {
      userErrors: [{ message: 'Unauthorized.' }],
      post: null
    };
  }

  const error = await canUserMutatePost({
    userId: userInfo.userId,
    postId: Number(postId),
    prisma
  });

  if (error) return error;

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
};

export const postPublish = async (
  _: any,
  { postId }: { postId: string },
  { prisma, userInfo }: Context
): Promise<PostPayload> => {
  if (!userInfo) {
    return {
      userErrors: [{ message: 'Unauthorized.' }],
      post: null
    };
  }

  const error = await canUserMutatePost({
    userId: userInfo.userId,
    postId: Number(postId),
    prisma
  });

  if (error) return error;

  const publishedPost = await prisma.post.update({
    where: {
      id: Number(postId)
    },
    data: {
      published: true
    }
  });

  return {
    userErrors: null,
    post: publishedPost
  };
};

export const postUnpublish = async (
  _: any,
  { postId }: { postId: string },
  { prisma, userInfo }: Context
): Promise<PostPayload> => {
  if (!userInfo) {
    return {
      userErrors: [{ message: 'Unauthorized.' }],
      post: null
    };
  }

  const error = await canUserMutatePost({
    userId: userInfo.userId,
    postId: Number(postId),
    prisma
  });

  if (error) return error;

  const publishedPost = await prisma.post.update({
    where: {
      id: Number(postId)
    },
    data: {
      published: false
    }
  });

  return {
    userErrors: null,
    post: publishedPost
  };
};
