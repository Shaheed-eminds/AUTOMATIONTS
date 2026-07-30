import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Central place that reads process.env. Nothing else in the framework
 * should call `process.env` directly — import `env` instead, so every
 * setting has one typed home and one place to add validation later.
 */
export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://opensource-demo.orangehrmlive.com',
  standardUser: {
    username: process.env.STANDARD_USERNAME ?? 'Admin',
    password: process.env.STANDARD_PASSWORD ?? 'admin123',
  },
};
