import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/pageFixtures';
import { users } from '../data/users';

/**
 * createBdd(test) ties Given/When/Then to the SAME fixtures used by the
 * plain-spec tests in tests/login.spec.ts — steps get `loginPage` and
 * `dashboardPage` for free, no re-instantiation, no separate world object.
 */
const { Given, When, Then } = createBdd(test);

Given('I am on the login page', async ({ loginPage }) => {
  await loginPage.open();
});

When('I log in with valid credentials', async ({ loginPage }) => {
  await loginPage.login(users.standard.username, users.standard.password);
});

When('I log in with username {string} and password {string}', async ({ loginPage }, username: string, password: string) => {
  await loginPage.login(username, password);
});

Then('I should see the dashboard', async ({ dashboardPage, page }) => {
  await dashboardPage.expectLoaded();
  await expect(page).toHaveURL(/dashboard/);
});

Then('I should see the error message {string}', async ({ loginPage }, message: string) => {
  await loginPage.expectErrorMessage(message);
});

Then('I should see a required field validation error', async ({ page }) => {
  await expect(
    page.locator('.oxd-input-group .oxd-input-field-error-message').first()
  ).toHaveText('Required');
});
