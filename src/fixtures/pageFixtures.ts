import { test as base } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { AutomationFormPage } from '../pages/AutomationFormPage';
import { WindowManager } from '../utils/WindowManager';
import { FrameManager } from '../utils/FrameManager';

/**
 * Extends playwright-bdd's `test` (itself a superset of @playwright/test's
 * TestType — same fixtures plus Given/When/Then support) with one fixture
 * per page object. Tests ask for `{ loginPage }` instead of writing
 * `new LoginPage(page)` everywhere — add a new page object once here and
 * it's available to every spec AND every BDD step with no other wiring.
 */
type Pages = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  automationFormPage: AutomationFormPage;
  windowManager: WindowManager;
  frameManager: FrameManager;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  automationFormPage: async ({ page }, use) => {
    await use(new AutomationFormPage(page));
  },
  windowManager: async ({ page, context }, use) => {
    await use(new WindowManager(context, page));
  },
  frameManager: async ({}, use) => {
    await use(new FrameManager());
  },
});

export { expect } from '@playwright/test';
