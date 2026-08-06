import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const bddTestDir = defineBddConfig({
  features: 'features/**/*.feature',
  // pageFixtures.ts is included here (not just the step files) so bddgen
  // picks up the custom `test` it exports — that's what gives BDD steps
  // the same personalDetailsPage/jobDetailsPage/etc. fixtures as the plain specs.
  steps: ['steps/**/*.ts', 'src/fixtures/pageFixtures.ts'],
});



export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['junit', { outputFile: 'reports/results.xml' }],
  ],
  use: {
    // Headed locally so you can watch the browser; CI stays headless (no display, faster).
    // Override locally with `HEADLESS=False` (see the test:headless script) if you want a quick headless check.
    headless: process.env.CI ? true : process.env.HEADLESS === 'False',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 20_000,
  },
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    // {
    //   name: 'bdd',
    //   testDir: bddTestDir,
    //   use: { ...devices['Desktop Chrome'] },
    // },
  ],
  
});
