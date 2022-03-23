import { postCreate, postUpdate, postDelete } from './post';
import { signup, signin } from './auth';

export const Mutation = {
  postCreate,
  postUpdate,
  postDelete,

  signup,
  signin
};
