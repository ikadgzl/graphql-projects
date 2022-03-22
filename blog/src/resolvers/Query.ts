import { Post } from '@prisma/client';
import { Context } from '..';

export const Query = {
  posts: async (_, __, { prisma }: Context): Promise<Post[]> => {
    return await prisma.post.findMany({
      orderBy: [
        {
          createdAt: 'desc'
        }
      ]
    });
  }
};
