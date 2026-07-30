import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/pageFixtures';

/**
 * Generic, selector-driven steps for actions that don't warrant a
 * dedicated page object (or a page object hasn't been written yet).
 * Any .feature file can use these directly — nothing here is tied to
 * OrangeHRM or the login flow.
 *
 * Prefer page-object steps (like login.steps.ts) when a locator is
 * reused often or the page has real business meaning; reach for these
 * when a scenario just needs a one-off click/fill.
 */
const { When, Then } = createBdd(test);

When('I click on {string}', async ({ windowManager, frameManager }, selector: string) => {
  const root = frameManager.resolve(windowManager.active);
  await root.locator(selector).click();
});

When(
  'I fill {string} with {string}',
  async ({ windowManager, frameManager }, selector: string, value: string) => {
    const root = frameManager.resolve(windowManager.active);
    await root.locator(selector).fill(value);
  }
);

Then('I should see {string}', async ({ windowManager, frameManager }, selector: string) => {
  const root = frameManager.resolve(windowManager.active);
  await expect(root.locator(selector)).toBeVisible();
});

// --- Window / tab handling -------------------------------------------------

When('I switch to the first window', async ({ windowManager }) => {
  windowManager.switchToFirst();
});

When('I switch to the latest window', async ({ windowManager }) => {
  windowManager.switchToLatest();
});

When('I switch to window {int}', async ({ windowManager }, index: number) => {
  windowManager.switchTo(index);
});

When('I close the current window', async ({ windowManager }) => {
  await windowManager.closeActive();
});

Then('I should have {int} open window(s)', async ({ windowManager }, count: number) => {
  expect(windowManager.count()).toBe(count);
});

// --- Frame / iframe handling ------------------------------------------------

When('I switch to frame {string}', async ({ frameManager }, selector: string) => {
  frameManager.useFrame(selector);
});

When('I switch to the default content', async ({ frameManager }) => {
  frameManager.useDefaultContent();
});
