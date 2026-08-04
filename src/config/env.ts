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
  // `||` on purpose, not `??`: a CI pipeline variable that's referenced but
  // never actually configured (e.g. Azure Pipelines' $(BASE_URL)) resolves
  // to an empty string, not undefined — `??` would silently accept that
  // empty string instead of falling back, breaking every relative goto().
  baseUrl: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
  standardUser: {
    username: process.env.STANDARD_USERNAME || 'Admin',
    password: process.env.STANDARD_PASSWORD || 'admin123',
  },
  // Absolute URL: this page lives on a different domain than `baseUrl` above,
  // so AutomationFormPage.open() navigates to it directly rather than via
  // Playwright's baseURL-relative goto.
  automationPracticeUrl:
    process.env.AUTOMATION_PRACTICE_URL ||
    'https://testautomationpractice.blogspot.com/2018/09/automation-form.html',
  // Local file, same reasoning as automationPracticeUrl above — an absolute
  // file:// URL, navigated to directly rather than via baseURL. The file
  // ships in this repo (apps/onboardly-app.html) so this path resolves the
  // same way on any machine or CI runner, not just the original author's.
  onboardlyAppUrl:
    process.env.ONBOARDLY_APP_URL ||
    pathToFileURL(path.resolve(__dirname, '../../apps/onboardly-app.html')).href,
};
