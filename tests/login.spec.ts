import { test, expect } from '../src/fixtures/pageFixtures';
import { users } from '../src/data/users';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('logs in successfully with valid credentials', async ({ loginPage, dashboardPage, page }) => {
    await loginPage.login(users.standard.username, users.standard.password);

    await dashboardPage.expectLoaded();
    await expect(page).toHaveURL(/dashboard/);
  });

  test('shows an error with invalid credentials', async ({ loginPage }) => {
    await loginPage.login(users.invalid.username, users.invalid.password);

    await loginPage.expectErrorMessage('Invalid credentials');
  });

  test('shows a validation error when fields are left empty', async ({ loginPage, page }) => {
    await loginPage.login('', '');

    await expect(page.locator('.oxd-input-group .oxd-input-field-error-message').first()).toHaveText(
      'Required'
    );
  });
});
