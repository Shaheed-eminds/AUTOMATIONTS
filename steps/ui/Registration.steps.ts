import { createBdd } from 'playwright-bdd';
import { test } from '../../src/fixtures/pageFixtures';
import { BenefitsPage } from '@pages/BenefitsPage';
import { LogniDetailsPage} from '@pages/LogniDetailsPage';
import { RequesterDetailsPage } from '@pages/RequesterDetailsPage';
import { CaseDetailsPage } from '@pages/CaseDetailsPage';


const { Given, When, Then } = createBdd(test);

// ---------- Screen 1: Login details for RenderApp----------

Given('I am on the Login Application screen', async ({ loginDetailsPage }) => {
    await loginDetailsPage.open();
  await loginDetailsPage.expectScreenVisible(1);
});

When('I try to signin without filling in the valid login credentials on screen', async ({ loginDetailsPage }) => {
  await loginDetailsPage.goSignIn();
});


Then('I should see the login details required field error', async ({ loginDetailsPage }) => {
  await loginDetailsPage.expectUserNameError();
  await loginDetailsPage.expectScreenVisible(1);
});

When('I fill in the Username {string}', async ({ loginDetailsPage }, name: string) => {
  //await loginDetailsPage.waitUntilUsernameDisplayed();
  await loginDetailsPage.fillUsername(name);
});

When('I fill in the Password {string}', async ({ loginDetailsPage }, password: string) => {
  await loginDetailsPage.fillPassword(password);
});

When('I click signin on the Login details screen', async ({ loginDetailsPage,requesterDetailsPage }) => {
  await loginDetailsPage.goSignIn();
  //await requesterDetailsPage.expectScreenVisible(2);
});

Then('I should see the requester details screen', async ({ requesterDetailsPage }) => {
  await requesterDetailsPage.expectScreenVisible(2);
});


When('I select the fullname {string}', async ({ requesterDetailsPage }, fullName: string) => {
  await requesterDetailsPage.fillFullName(fullName);
  });

When('I select the employeeID {string}', async ({ requesterDetailsPage }, empID: string) => {
  await requesterDetailsPage.fillEmployeeID(empID);
});

When('I select the emailAddress {string}', async ({ requesterDetailsPage }, email: string) => {
  await requesterDetailsPage.fillEmailAddress(email);
});

When('I select the department {string}', async ({ requesterDetailsPage }, department: string) => {
  await requesterDetailsPage.selectDepartment(department);
});

When('I select the priority type {string}', async ({ requesterDetailsPage }, priorityType: string) => {
  if (priorityType === 'Low') {
    await requesterDetailsPage.selectPriority('Low' as any);
  } else if (priorityType === 'Medium') {
    await requesterDetailsPage.selectPriority('Medium' as any);
  } else if (priorityType === 'High') {
    await requesterDetailsPage.selectPriority('High' as any);
  } else if (priorityType === 'Critical') {
    await requesterDetailsPage.selectPriority('Critical' as any);
  }
});
   
Then('I click Next on the Requester details screen', async ({ requesterDetailsPage, caseDetailsPage }) => {
  await requesterDetailsPage.goNext();
  await caseDetailsPage.expectScreenVisible(3);
});