import { Context } from '..';
import { userBatch, userLoader } from '../loaders/userLoader';

interface PostParentArgs {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

export const Post = {
  user: async ({ authorId }: PostParentArgs, _: any, { prisma }: Context) => {
    return await userLoader.load(authorId);
  }
};
