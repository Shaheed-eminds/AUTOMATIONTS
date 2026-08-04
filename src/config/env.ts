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
  // resolves the same way on any machine or CI runner, not just the
  // original author's. `||` on purpose, not `??`: a CI pipeline variable
  // that's referenced but never actually configured resolves to an empty
  // string, not undefined — `??` would silently accept that empty string.
  onboardlyAppUrl:
    process.env.ONBOARDLY_APP_URL ||
    pathToFileURL(path.resolve(__dirname, '../../apps/onboardly-app.html')).href,
};
