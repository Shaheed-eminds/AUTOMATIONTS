import { createBdd } from 'playwright-bdd';
import { test } from '../../src/fixtures/pageFixtures';
import { BenefitsPage } from '@pages/BenefitsPage';

const { Given, When, Then } = createBdd(test);

// ---------- Screen 1: Login details for RenderApp----------

Given('I am on the Login Application screen', async ({ logniDetailsPage }) => {
  await logniDetailsPage.open();
  await logniDetailsPage.expectScreenVisible(1);
});

When('I try to signin without filling in the valid login credentials on screen', async ({ logniDetailsPage }) => {
  await logniDetailsPage.goSignIn();
});

Then('I should see the login details required field error', async ({ logniDetailsPage }) => {
  await logniDetailsPage.expectUserNameError();
  await logniDetailsPage.expectScreenVisible(1);
});

When('I fill in the Username {string}', async ({ logniDetailsPage }, name: string) => {
  await logniDetailsPage.fillUsername(name);
});

When('I fill in the Password {string}', async ({ logniDetailsPage }, password: string) => {
  await logniDetailsPage.fillPassword(password);
});

When('I click signin on the Login details screen', async ({ logniDetailsPage,requesterDetailsPage }) => {
  await logniDetailsPage.goSignIn();
  await requesterDetailsPage.expectScreenVisible(2);
});

Then('I should see the requester details screen', async ({ requesterDetailsPage }) => {
  await requesterDetailsPage.expectScreenVisible(2);
});

// ---------- Screen 2: Requester details ----------

When('I select the fullname {string}', async ({ requesterDetailsPage }, fullName: string) => {
  await requesterDetailsPage.fillFullName(fullName);
  });

When('I select the role {string}', async ({ requesterDetailsPage }, empID: string) => {
  await requesterDetailsPage.fillEmployeeID(empID);
});