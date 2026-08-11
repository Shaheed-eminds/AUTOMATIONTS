import * as dotenv from 'dotenv';
import * as path from 'path';
import { pathToFileURL } from 'url';

dotenv.config();

/**
 * Central place that reads process.env. Nothing else in the framework
 * should call `process.env` directly — import `env` instead, so every
 * setting has one typed home and one place to add validation later.
 */
export const env = {
  // Absolute file:// URL, navigated to directly rather than via baseURL.
  // The file ships in this repo (apps/onboardly-app.html) so this path
  // resolves 

  caseProAppUrl: process.env.CASEPRO_APP_URL || 'https://automationts.onrender.com/',
}