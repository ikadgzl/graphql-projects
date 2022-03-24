import { Context } from '..';

interface ProfileParentArgs {
  id: number;
  bio: string;
  userId: number;
}

export const Profile = {
  user: async ({ userId }: ProfileParentArgs, _: any, { prisma }: Context) => {
    return prisma.user.findUnique({
      where: { id: userId }
    });
  }
};
