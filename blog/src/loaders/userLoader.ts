import { User } from '@prisma/client';
import DataLoader from 'dataloader';
import { prisma } from '..';

type BatchUser = (ids: number[]) => Promise<User[]>;

export const userBatch: BatchUser = async (ids) => {
  console.log('HELLO', ids);

  const users = await prisma.user.findMany({
    where: {
      id: { in: ids }
    }
  });

  const userObj: { [key: string]: User } = {};

  users.forEach((user) => {
    userObj[user.id] = user;
  });

  return ids.map((id) => userObj[id]);
};

//@ts-ignore
export const userLoader = new DataLoader<number, User>(userBatch);
