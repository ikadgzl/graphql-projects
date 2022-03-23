import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../keys';

export const getUserFromToken = (token: string): { userId: number } | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number };
  } catch (error) {
    return null;
  }
};
