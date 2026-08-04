import { test as base } from 'playwright-bdd';
import { PersonalDetailsPage } from '../pages/PersonalDetailsPage';
import { JobDetailsPage } from '../pages/JobDetailsPage';
import { BenefitsPage } from '../pages/BenefitsPage';
import { ReviewPage } from '../pages/ReviewPage';
import { WindowManager } from '../utils/WindowManager';
import { FrameManager } from '../utils/FrameManager';

/**
 * Extends playwright-bdd's `test` (itself a superset of @playwright/test's
 * TestType — same fixtures plus Given/When/Then support) with one fixture
 * per page object. Tests ask for `{ personalDetailsPage }` instead of writing
 * `new PersonalDetailsPage(page)` everywhere — add a new page object once here
 * and it's available to every spec AND every BDD step with no other wiring.
 */
type Pages = {
  personalDetailsPage: PersonalDetailsPage;
  jobDetailsPage: JobDetailsPage;
  benefitsPage: BenefitsPage;
  reviewPage: ReviewPage;
  windowManager: WindowManager;
  frameManager: FrameManager;
};

export const test = base.extend<Pages>({
  personalDetailsPage: async ({ page }, use) => {
    await use(new PersonalDetailsPage(page));
  },
  jobDetailsPage: async ({ page }, use) => {
    await use(new JobDetailsPage(page));
  },
  benefitsPage: async ({ page }, use) => {
    await use(new BenefitsPage(page));
  },
  reviewPage: async ({ page }, use) => {
    await use(new ReviewPage(page));
  },
  windowManager: async ({ page, context }, use) => {
    await use(new WindowManager(context, page));
  },
  frameManager: async ({}, use) => {
    await use(new FrameManager());
  },
});

export { expect } from '@playwright/test';
