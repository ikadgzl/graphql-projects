import {
  postCreate,
  postUpdate,
  postDelete,
  postPublish,
  postUnpublish
} from './post';
import { signup, signin } from './auth';

export const Mutation = {
  postCreate,
  postUpdate,
  postDelete,
  postPublish,
  postUnpublish,

  signup,
  signin
};
