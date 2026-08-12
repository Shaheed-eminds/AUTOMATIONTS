import { test as base } from 'playwright-bdd';
//import { test as base } from '@playwright/test';

import {LoginDetailsPage} from '../pages/LoginDetailsPage';
import {RequesterDetailsPage} from '../pages/RequesterDetailsPage';
import {CaseDetailsPage} from '../pages/CaseDetailsPage';
import {TimesheetDetailsPage} from '../pages/TimesheetDetailsPage';
import {ReviewTimesheetPage} from '../pages/ReviewTimesheetPage';
import {CaseSubmittedPage} from '../pages/CaseSubmittedPage.ts';


 import { PersonalDetailsPage } from '../pages/PersonalDetailsPage';
 import { JobDetailsPage } from '../pages/JobDetailsPage';
 import { BenefitsPage } from '../pages/BenefitsPage';
import { ReviewPage } from '../pages/ReviewPage';
import { WindowManager } from '../utils/WindowManager';
import { FrameManager } from '../utils/FrameManager';

/**
/**
 * Extends playwright-bdd's `test` (itself a superset of @playwright/test's
 * TestType — same fixtures plus Given/When/Then support) with one fixture
 * per page object. Tests ask for `{ personalDetailsPage }` instead of writing
 * `new PersonalDetailsPage(page)` everywhere — add a new page object once here
 * and it's available to every spec AND every BDD step with no other wiring.
 */
type Pages = {

  /*login details page -Render App*/
  loginDetailsPage: LoginDetailsPage;
  requesterDetailsPage: RequesterDetailsPage;
  caseDetailsPage: CaseDetailsPage;
  timesheetDetailsPage: TimesheetDetailsPage;
   reviewtimesheetPage: ReviewTimesheetPage;
   casesubmittedPage: CaseSubmittedPage;

  personalDetailsPage: PersonalDetailsPage;
  jobDetailsPage: JobDetailsPage;
  benefitsPage: BenefitsPage;
  reviewPage: ReviewPage;
  windowManager: WindowManager;
  frameManager: FrameManager;
};


export const test = base.extend<Pages>({

loginDetailsPage: async ({ page }, use) => {
    await use(new LoginDetailsPage(page));
  },

requesterDetailsPage: async ({ page }, use) => {
    await use(new RequesterDetailsPage(page));
  },

  caseDetailsPage: async ({ page }, use) => {
    await use(new CaseDetailsPage(page));
  },

  timesheetDetailsPage: async ({ page }, use) => {
    await use(new TimesheetDetailsPage(page));
  },

   reviewtimesheetPage: async ({ page }, use) => {
    await use(new ReviewTimesheetPage(page));
  },

  casesubmittedPage: async ({ page }, use) => {
    await use(new CaseSubmittedPage(page));
  },


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
