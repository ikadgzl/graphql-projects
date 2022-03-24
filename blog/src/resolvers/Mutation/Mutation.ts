import { postCreate, postUpdate, postDelete, postPublish, postUnpublish } from './Post';
import { signup, signin } from './Auth';

export const Mutation = {
  postCreate,
  postUpdate,
  postDelete,
  postPublish,
  postUnpublish,

  signup,
  signin
};
