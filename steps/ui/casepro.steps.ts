import { createBdd } from 'playwright-bdd';
import { test } from '../../src/fixtures/pageFixtures';

const { Given, When, Then } = createBdd(test);

// ---------- Login ----------

Given('I am on the CasePro login screen', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.expectOnLoginScreen();
});

When('I sign in with username {string} and password {string}', async ({ loginPage }, username: string, password: string) => {
  await loginPage.signIn(username, password);
});

When('I log out', async ({ loginPage }) => {
  await loginPage.logOut();
});

// ---------- Screen 1: Requester details ----------

When('I try to continue without filling in the requester details screen', async ({ requesterPage }) => {
  await requesterPage.goNext();
});

Then('I should see the requester details required field errors', async ({ requesterPage }) => {
  await requesterPage.expectAllRequiredFieldErrors();
  console.log('Requester details required field error messages are displayed.');
});

When('I fill in the requester full name {string}', async ({ requesterPage }, name: string) => {
  await requesterPage.fillFullName(name);
});

When('I fill in the employee id {string}', async ({ requesterPage }, employeeId: string) => {
  await requesterPage.fillEmployeeId(employeeId);
});

When('I fill in the requester email {string}', async ({ requesterPage }, email: string) => {
  await requesterPage.fillEmail(email);
});

When('I select the requester department {string}', async ({ requesterPage }, department: string) => {
  await requesterPage.selectDepartment(department);
});

When('I select the priority {string}', async ({ requesterPage }, priority: string) => {
  await requesterPage.selectPriority(priority);
});

When('I click next on the requester details screen', async ({ requesterPage, caseDetailsPage }) => {
  await requesterPage.goNext();
  await caseDetailsPage.expectScreenVisible(2);
});

// ---------- Screen 2: Case details ----------

When('I try to continue without filling in the case details screen', async ({ caseDetailsPage }) => {
  await caseDetailsPage.goNext();
});

Then('I should see the case details required field errors', async ({ caseDetailsPage }) => {
  await caseDetailsPage.expectAllRequiredFieldErrors();
  console.log('Case details required field error messages are displayed.');
});

When('I fill in the subject {string}', async ({ caseDetailsPage }, subject: string) => {
  await caseDetailsPage.fillSubject(subject);
});

When('I select the category {string}', async ({ caseDetailsPage }, category: string) => {
  await caseDetailsPage.selectCategory(category);
});

When('I select the case type {string}', async ({ caseDetailsPage }, caseType: string) => {
  await caseDetailsPage.selectCaseType(caseType);
});

When('I select the impact level {string}', async ({ caseDetailsPage }, impactLevel: string) => {
  await caseDetailsPage.selectImpactLevel(impactLevel);
});

When('I fill in the description {string}', async ({ caseDetailsPage }, description: string) => {
  await caseDetailsPage.fillDescription(description);
});

When('I click next on the case details screen', async ({ caseDetailsPage, timesheetPage }) => {
  await caseDetailsPage.goNext();
  await timesheetPage.expectScreenVisible(3);
});

// ---------- Screen 3: Timesheet ----------

When('I try to continue without filling in the timesheet screen', async ({ timesheetPage }) => {
  await timesheetPage.goNext();
});

Then('I should see the timesheet required field error', async ({ timesheetPage }) => {
  await timesheetPage.expectRequiredFieldError();
  console.log('Timesheet required field error message is displayed.');
});

When('I fill in timesheet entry {int} with date {string}, project {string}, task {string}, hours {string}', async ({ timesheetPage }, entryNumber: number, date: string, project: string, task: string, hours: string) => {
  await timesheetPage.fillEntry(entryNumber, date, project, task, hours);
});

When('I click next on the timesheet screen', async ({ timesheetPage, caseReviewPage }) => {
  await timesheetPage.goNext();
  await caseReviewPage.expectScreenVisible(4);
});

// ---------- Screen 4: Review & submit, success ----------

Then('I should see {string} in the review requester summary', async ({ caseReviewPage }, fullName: string) => {
  await caseReviewPage.expectRequesterSummaryContains(fullName);
});

Then('I should see {string} in the review case summary', async ({ caseReviewPage }, text: string) => {
  await caseReviewPage.expectCaseSummaryContains(text);
});

When('I submit the case', async ({ caseReviewPage }) => {
  await caseReviewPage.submit();
});

Then('I should see the case submitted success heading', async ({ caseReviewPage }) => {
  await caseReviewPage.expectSuccessHeadingVisible();
});

Then('I should see a case id on the success screen', async ({ caseReviewPage, caseProState }) => {
  await caseReviewPage.expectCaseIdVisible();
  caseProState.caseId = await caseReviewPage.getCaseId();
});

// ---------- Admin: dashboard, approve ----------

Then('I should see the admin dashboard', async ({ adminDashboardPage }) => {
  await adminDashboardPage.expectOnDashboard();
});

When('I search for the submitted case', async ({ adminDashboardPage, caseProState }) => {
  await adminDashboardPage.searchForCaseId(caseProState.caseId);
});

When('I approve the case', async ({ adminApprovalPage }) => {
  await adminApprovalPage.approve();
});

Then('I should see the case status {string}', async ({ adminApprovalPage }, status: string) => {
  await adminApprovalPage.expectCaseStatus(status);
});
