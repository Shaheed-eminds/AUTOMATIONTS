import { createBdd } from 'playwright-bdd';
import { test } from '../../src/fixtures/pageFixtures';
import { BenefitsPage } from '@pages/BenefitsPage';

const { Given, When, Then } = createBdd(test);

// ---------- Screen 1: Personal details ----------

Given('I am on the onboarding personal details screen', async ({ personalDetailsPage }) => {
  await personalDetailsPage.open();
  await personalDetailsPage.expectScreenVisible(1);
});

When('I try to continue without filling in the personal details screen', async ({ personalDetailsPage }) => {
  await personalDetailsPage.goNext();
});

Then('I should see the personal details required field errors', async ({ personalDetailsPage }) => {
  await personalDetailsPage.expectAllRequiredFieldErrors();
  await personalDetailsPage.expectScreenVisible(1);
});

When('I fill in the full name {string}', async ({ personalDetailsPage }, name: string) => {
  await personalDetailsPage.fillFullName(name);
});

When('I fill in the email {string}', async ({ personalDetailsPage }, email: string) => {
  await personalDetailsPage.fillEmail(email);
});

When('I select the country {string}', async ({ personalDetailsPage }, country: string) => {
  await personalDetailsPage.selectCountry(country);
});

When('I select the state {string}', async ({ personalDetailsPage }, state: string) => {
  await personalDetailsPage.selectState(state);
});

When('I select the city {string}', async ({ personalDetailsPage }, city: string) => {
  await personalDetailsPage.selectCity(city);
});

When('I select the employment type {string}', async ({ personalDetailsPage }, employmentType: string) => {
  if (employmentType === 'full-time') {
    await personalDetailsPage.selectEmploymentType('full-time');
  } else if (employmentType === 'contract') {
    await personalDetailsPage.selectEmploymentType('contract');
  } else if (employmentType === 'intern') {
    await personalDetailsPage.selectEmploymentType('intern');
  }
});

When('I click next on the personal details screen', async ({ personalDetailsPage, jobDetailsPage }) => {
  await personalDetailsPage.goNext();
  await jobDetailsPage.expectScreenVisible(2);
});

// ---------- Screen 2: Job details ----------

When('I try to continue without filling in the job details screen', async ({ jobDetailsPage }) => {
  await jobDetailsPage.goNext();
});

Then('I should see the job details required field errors', async ({ jobDetailsPage }) => {
  await jobDetailsPage.expectAllRequiredFieldErrors();
  await jobDetailsPage.expectScreenVisible(2);
});

When('I select the department {string}', async ({ jobDetailsPage }, department: string) => {
  await jobDetailsPage.selectDepartment(department);
});

When('I select the role {string}', async ({ jobDetailsPage }, role: string) => {
  await jobDetailsPage.selectRole(role);
});

When('I fill in the reporting manager {string}', async ({ jobDetailsPage }, manager: string) => {
  await jobDetailsPage.fillReportingManager(manager);
});

When('I choose to work remotely {string}', async ({ jobDetailsPage }, remote: string) => {
  if (remote === 'yes') {
    await jobDetailsPage.selectRemote('yes');
  } else {
    await jobDetailsPage.selectRemote('no');
  }
});

When('I select the timezone {string}', async ({ jobDetailsPage }, timezone: string) => {
  await jobDetailsPage.selectTimezone(timezone);
});

When('I click next on the job details screen', async ({ jobDetailsPage, benefitsPage }) => {
  await jobDetailsPage.goNext();
  await benefitsPage.expectScreenVisible(3);
});

// ---------- Screen 3: Benefits ----------

When('I select the health plan {string}', async ({ benefitsPage }, healthPlan: string) => {
  await benefitsPage.selectHealthPlan(healthPlan);
});

When('I set the number of dependents to {int}', async ({ benefitsPage }, count: number) => {
  await benefitsPage.setDependentsCount(count);
});


When('I fill in dependent {int} name {string}', async ({ benefitsPage }, dependentNumber: number, name: string) => {
  await benefitsPage.fillDependentName(dependentNumber - 1, name); // -1 since page object is 0-indexed
});

When('I fill in the retirement contribution {string}', async ({ benefitsPage }, pct: string) => {
  await benefitsPage.fillRetirementPct(pct);
});

When('I check the equity grant checkbox', async ({ benefitsPage }) => {
  await benefitsPage.checkEquityGrant();
});

When('I click next on the benefits screen', async ({ benefitsPage, reviewPage }) => {
  await benefitsPage.goNext();
  await reviewPage.expectScreenVisible(4);
});

// ---------- Screen 4: Review, Submit, Success ----------

When('I submit the onboarding form', async ({ reviewPage }) => {
  await reviewPage.submit();
  await reviewPage.expectScreenVisible('success');
});

Then('I should see the success heading {string}', async ({ reviewPage }, heading: string) => {
  await reviewPage.expectSuccessHeading(heading);
});

Then('I should see the success message {string}', async ({ reviewPage }, message: string) => {
  await reviewPage.expectSuccessMessage(message);
});

Then('I should see a submission id starting with {string}', async ({ reviewPage }, prefix: string) => {
  await reviewPage.expectSubmissionIdVisible(prefix);

  const submissionId = await reviewPage.getSubmissionId();
  console.log(`stored submission id: ${submissionId}`);
});

When('I restart the onboarding wizard', async ({ reviewPage }) => {
  await reviewPage.restart();
});

Then('I should be back on the onboarding personal details screen', async ({ personalDetailsPage }) => {
  await personalDetailsPage.expectScreenVisible(1);
});

When('I click edit button on the benefit section of the review page', async ({ reviewPage }) => {
  await reviewPage.editScreen3();
});

Then ('I land on the benefits Page', async({benefitsPage}) => {
  await benefitsPage.expectOnBenefitsScreen();
});


