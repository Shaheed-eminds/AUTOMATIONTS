import { env } from '../config/env';

export const users = {
  standard: env.standardUser,
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
};
