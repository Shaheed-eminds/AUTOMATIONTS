# AutomationTS — Playwright + TypeScript UI Framework

A reusable Page Object Model framework covering two independent targets —
the OrangeHRM demo (`https://opensource-demo.orangehrmlive.com`) for login,
and the public data-entry practice form
(`https://testautomationpractice.blogspot.com/2018/09/automation-form.html`)
for form-control coverage — built to be easy to extend for new pages and
specs without touching existing code.

## How it's organized

```
src/
  config/    env.ts        — single source of truth for env vars (BASE_URL, creds, other target URLs)
  pages/     BasePage.ts            — shared behaviour (goto, waits) every page object extends
             LoginPage.ts           — locators + actions for the OrangeHRM login screen
             DashboardPage.ts       — OrangeHRM post-login dashboard
             AutomationFormPage.ts  — locators + actions/assertions for the practice data-entry form
  fixtures/  pageFixtures.ts — extends Playwright's `test` so specs receive
                               `{ loginPage, dashboardPage, automationFormPage }` ready-made
  data/      users.ts       — named test data (standard user, invalid user)
  utils/     WindowManager.ts — tracks open tabs/windows for generic steps
             FrameManager.ts  — tracks current iframe scope for generic steps
steps/
  ui/        login.steps.ts           — Given/When/Then for the login flow (page-object-backed)
             automation-form.steps.ts — Given/When/Then for the data-entry form (page-object-backed)
             common.steps.ts          — generic click/fill/window/frame steps (selector-driven)
  hooks.ts   — reserved for global BDD Before/After hooks (none yet)
tests/
  login.spec.ts             — plain-spec example using the fixtures above
  automation-form.spec.ts   — plain-spec example for the data-entry form
features/
  ui/login.feature            — Gherkin scenarios for the OrangeHRM login flow
  ui/automation-form.feature  — Gherkin scenarios for the data-entry form
playwright.config.ts        — projects (chrome/firefox/webkit/bdd), reporters, timeouts
.env / .env.example          — BASE_URL, credentials, AUTOMATION_PRACTICE_URL (never commit .env)
```

**Why it's shaped this way:**
- **Page objects** hold locators and page-specific actions only — no assertions about
  business logic beyond "is this page in the state it claims to be" (see `expectLoaded`).
- **Fixtures** are the only place `new LoginPage(page)` gets called. Specs never
  construct page objects themselves, so adding a page object is one edit
  (`src/fixtures/pageFixtures.ts`), not a find-and-replace across every spec.
- **`env.ts`** is the only file that reads `process.env`. If a new environment
  variable is needed, add it there and everything else imports the typed `env` object.
- **Path aliases** (`@pages/*`, `@fixtures/*`, `@utils/*`, `@data/*`, `@config/*` in
  `tsconfig.json`) are available so imports don't turn into `../../../` chains as
  the suite grows.
- **BDD and plain specs share the same page objects and fixtures.** `login.steps.ts`
  calls `createBdd(test)` on the exact `test` exported from `pageFixtures.ts` — so
  `Given`/`When`/`Then` steps get `{ loginPage, dashboardPage }` the same way
  `login.spec.ts` does. Writing a scenario in Gherkin never means duplicating
  locators or actions.

## Getting started

```bash
npm install
npx playwright install        # first time only, downloads browser binaries
cp .env.example .env           # adjust BASE_URL / credentials if needed
```

## Running tests

```bash
npm test                    # default project (chrome), runs all specs — headed by default
npm run test:headless       # same, but headless (quick local check)
npm run test:all-browsers   # chrome + firefox + webkit
npm run test:firefox        # single browser
npm run test:webkit         # single browser
npm run test:debug          # Playwright inspector, step through
npm run report              # open the last HTML report
npm run codegen             # record actions into a new page object/spec
npm run test:bdd             # regenerate + run the Gherkin feature suite
```

> Tests run **headed** (visible browser) by default locally — `use.headless` in
> `playwright.config.ts` is `false` unless `CI` is set or you pass `HEADLESS=true`
> (as `test:headless` does). CI always runs headless.

> **Known local issue:** Firefox may fail to launch on this machine with
> `Host system is missing dependencies: msvcp140_1.dll`. That's a missing
> Visual C++ runtime on this Windows install, not a framework bug —
> Chrome and WebKit both run cleanly. Installing the "Microsoft Visual
> C++ Redistributable" fixes it if Firefox coverage is needed locally; CI
> runners aren't affected.

### Running from VS Code (green Run/Debug buttons)

1. Install the **Playwright Test for VSCode** extension (`ms-playwright.playwright`) —
   VS Code will prompt for it automatically via [.vscode/extensions.json](.vscode/extensions.json).
2. Open any file under `tests/`. The extension reads `playwright.config.ts`
   automatically, and a green ▶ Run and 🐞 Debug icon appears in the gutter
   next to every `test(...)` and `test.describe(...)` block.
3. Click ▶ to run just that test, or use the **Testing** sidebar (flask icon)
   to run/debug the whole file or suite.
4. [.vscode/settings.json](.vscode/settings.json) enables `playwright.showTrace`, so a failed
   run opens the trace viewer directly inside VS Code.

## Writing BDD scenarios (Gherkin)

This is an additional, optional style on top of the same framework — use it
when scenarios benefit from being readable by non-engineers, or keep writing
plain `.spec.ts` files where Gherkin would just be ceremony. Both can coexist.

1. Write (or extend) a `.feature` file under `features/ui/` (or `features/api/`),
   e.g. `features/ui/login.feature`:
   ```gherkin
   Scenario: Successful login with valid credentials
     Given I am on the login page
     When I log in with valid credentials
     Then I should see the dashboard
   ```
2. Implement any new step in `steps/ui/` (group by feature, e.g. `login.steps.ts`):
   ```ts
   import { createBdd } from 'playwright-bdd';
   import { test } from '../../src/fixtures/pageFixtures';

   const { Given, When, Then } = createBdd(test);

   Given('I am on the login page', async ({ loginPage }) => {
     await loginPage.open();
   });
   ```
   The callback's first argument is the same fixture bag as any spec test —
   `loginPage`, `dashboardPage`, `page`, etc. Add a page object once to
   `pageFixtures.ts` and it's available to steps too, no extra wiring.
3. Run `npm run test:bdd`. This runs `bddgen` first, which compiles every
   `.feature` + step definition into real Playwright test files under the
   git-ignored `.features-gen/` folder, then executes them via the `bdd`
   project in `playwright.config.ts`. You get Playwright's full toolset
   (parallelism, retries, trace/video/screenshot, HTML report) for Gherkin
   scenarios — nothing Cucumber-specific to configure.
4. **VS Code:** install the recommended **Cucumber (Gherkin) Full Support**
   extension for `.feature` syntax highlighting and step autocomplete
   (already wired to `steps/**/*.ts` in `.vscode/settings.json`). The
   Playwright extension's green Run buttons work on the *generated* files in
   `.features-gen/` after a `bddgen` run, not on the `.feature` file itself.

### Generic steps (click, fill, windows, frames)

[steps/ui/common.steps.ts](steps/ui/common.steps.ts) is a small library of
selector-driven steps for any `.feature` file — use them for a one-off
interaction that doesn't justify a dedicated page object yet. They're backed
by two stateful helpers registered as fixtures in `pageFixtures.ts`:
[WindowManager](src/utils/WindowManager.ts) (tracks every tab/window opened
in the browser context) and [FrameManager](src/utils/FrameManager.ts) (tracks
which iframe, if any, actions should target).

```gherkin
When I click on "#some-button"
When I fill "input[name='email']" with "someone@example.com"
Then I should see ".success-banner"

# Windows/tabs — auto-tracked the moment a new one opens (e.g. target="_blank")
Then I should have 2 open window(s)
When I switch to the latest window
When I switch to the first window
When I switch to window 1
When I close the current window

# Frames — click/fill/see steps above automatically target the active frame
When I switch to frame "#billing-iframe"
When I click on "#pay-now"
When I switch to the default content
```

Prefer a real page object + named steps (like `login.steps.ts`) once a
locator gets reused across scenarios — that keeps the Gherkin readable
(`Given I am on the login page`, not raw CSS) and the locator in one place.
Reach for the generic steps for quick, one-off coverage.

## Adding a new page/spec

1. Create `src/pages/YourPage.ts` extending `BasePage`, following `LoginPage.ts`
   as a template: locators in the constructor, actions as methods.
2. Register it in `src/fixtures/pageFixtures.ts` (add to the `Pages` type and
   the `test.extend` block).
3. Import `{ test, expect }` from `../src/fixtures/pageFixtures` in your spec
   (not from `@playwright/test` directly) and destructure the fixture you need.
4. Put any reusable test data in `src/data/`, and any new env var in `src/config/env.ts`.

## Reports & debugging

Every run writes an HTML report to `reports/html-report` and, on failure,
a screenshot, video, and trace to `test-results/`. Open a trace with:

```bash
npx playwright show-trace test-results/<failed-test-folder>/trace.zip
```
