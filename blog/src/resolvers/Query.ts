import { Post, User } from '@prisma/client';
import { Context } from '..';

export const Query = {
  me: async (_: any, __: any, { prisma, userInfo }: Context) => {
    if (!userInfo) return null;

    return await prisma.user.findUnique({
      where: {
        id: userInfo?.userId
      }
    });
  },

  profile: async (_: any, { userId }: { userId: string }, { prisma }: Context) => {
    if (!userId) return null;

    return await prisma.profile.findUnique({
      where: {
        userId: Number(userId)
      }
    });
  },

  posts: async (_: any, __: any, { prisma }: Context): Promise<Post[]> => {
    return await prisma.post.findMany({
      where: {
        published: true
      },
      orderBy: [
        {
          createdAt: 'desc'
        }
      ]
    });
  }
};
