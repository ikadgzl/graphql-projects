import { Context } from '..';

interface PostParentArgs {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

export const Post = {
  user: async ({ authorId }: PostParentArgs, _: any, { prisma }: Context) => {
    return await prisma.user.findUnique({ where: { id: authorId } });
  }
};
