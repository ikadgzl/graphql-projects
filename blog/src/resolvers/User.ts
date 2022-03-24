import { Context } from '..';

interface PostParentArgs {
  id: number;
  email: string;
}

export const User = {
  posts: async ({ id }: PostParentArgs, _: any, { prisma, userInfo }: Context) => {
    const isOwnProfile = id === userInfo?.userId;

    if (isOwnProfile) {
      return await prisma.post.findMany({
        where: {
          authorId: id
        },
        orderBy: [{ createdAt: 'desc' }]
      });
    }

    return await prisma.post.findMany({
      where: {
        authorId: id,
        published: true
      },
      orderBy: [{ createdAt: 'desc' }]
    });
  }
};
