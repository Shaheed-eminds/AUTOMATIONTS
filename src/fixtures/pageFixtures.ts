import { test as base } from 'playwright-bdd';
import { PersonalDetailsPage } from '../pages/PersonalDetailsPage';
import { JobDetailsPage } from '../pages/JobDetailsPage';
import { BenefitsPage } from '../pages/BenefitsPage';
import { ReviewPage } from '../pages/ReviewPage';
import { WindowManager } from '../utils/WindowManager';
import { FrameManager } from '../utils/FrameManager';
import { LoginPage } from '../pages/Login';
import { RequesterPage } from '../pages/Requester';
import { CaseDetailsPage } from '../pages/CaseDetails';
import { TimesheetPage } from '../pages/Timesheet';
import { CaseReviewPage } from '../pages/CaseReviewPage';
import { AdminDashboardPage } from '../pages/AdminDashboardPage';
import { AdminApprovalPage } from '../pages/AdminApproval';

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
  loginPage: LoginPage;
  requesterPage: RequesterPage;
  caseDetailsPage: CaseDetailsPage;
  timesheetPage: TimesheetPage;
  caseReviewPage: CaseReviewPage;
  adminDashboardPage: AdminDashboardPage;
  adminApprovalPage: AdminApprovalPage;
  caseProState: { caseId: string };
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
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  requesterPage: async ({ page }, use) => {
    await use(new RequesterPage(page));
  },
  caseDetailsPage: async ({ page }, use) => {
    await use(new CaseDetailsPage(page));
  },
  timesheetPage: async ({ page }, use) => {
    await use(new TimesheetPage(page));
  },
  caseReviewPage: async ({ page }, use) => {
    await use(new CaseReviewPage(page));
  },
  adminDashboardPage: async ({ page }, use) => {
    await use(new AdminDashboardPage(page));
  },
  adminApprovalPage: async ({ page }, use) => {
    await use(new AdminApprovalPage(page));
  },
  caseProState: async ({}, use) => {
    await use({ caseId: '' });
  },
});

export { expect } from '@playwright/test';
