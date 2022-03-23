import { Context } from '../..';
import validator from 'validator';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { JWT_SECRET } from '../../keys';

type Credentials = {
  password: string;
  email: string;
};

interface SignupArgs {
  credentials: Credentials;
  name: string;
  bio: string;
}

interface SigninArgs {
  credentials: Credentials;
}

interface UserPayload {
  userErrors:
    | {
        message: string;
      }[]
    | null;
  token: string | null;
}

export const signup = async (
  _: any,
  { credentials: { email, password }, name, bio }: SignupArgs,
  { prisma }: Context
): Promise<UserPayload> => {
  // TODO: warn user on the frontend, backend just sending generic message.
  const validEmail = validator.isEmail(email);
  const validPassword = validator.isLength(password, {
    min: 5
  });

  if (!validEmail || !validPassword || !name || !bio) {
    return {
      userErrors: [{ message: 'Invalid credentials.' }],
      token: null
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword
    }
  });

  await prisma.profile.create({
    data: {
      bio,
      userId: user.id
    }
  });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: '2h'
  });

  return {
    userErrors: null,
    token
  };
};

export const signin = async (
  _: any,
  { credentials: { email, password } }: SigninArgs,
  { prisma }: Context
): Promise<UserPayload> => {
  console.log(email, password);

  if (!email || !password) {
    return {
      userErrors: [{ message: 'Please provide the credentials.' }],
      token: null
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    return {
      userErrors: [{ message: 'Invalid credentials.' }],
      token: null
    };
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return {
      userErrors: [{ message: 'Invalid credentials.' }],
      token: null
    };
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: '2h'
  });

  return {
    userErrors: null,
    token
  };
};
