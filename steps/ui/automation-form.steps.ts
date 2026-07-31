import { createBdd } from 'playwright-bdd';
import { test } from '../../src/fixtures/pageFixtures';
import { Day, Gender } from '../../src/pages/AutomationFormPage';

const { Given, When, Then } = createBdd(test);

// Comma-separated Outline cells (e.g. "<days>" = "monday,wednesday,friday")
// come through as a single string — this splits and trims them into a list.
function splitList(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

Given('I am on the automation practice form page', async ({ automationFormPage }) => {
  await automationFormPage.open();
});

When(
  'I enter personal details name {string} email {string} phone {string} address {string}',
  async ({ automationFormPage }, name: string, email: string, phone: string, address: string) => {
    await automationFormPage.fillPersonalDetails({ name, email, phone, address });
  }
);

Then('the {word} field should contain {string}', async ({ automationFormPage }, field, value: string) => {
  await automationFormPage.expectFieldValue(field, value);
});

When('I select {string} as the gender', async ({ automationFormPage }, gender: Gender) => {
  await automationFormPage.selectGender(gender);
});

Then('the {string} gender option should be selected', async ({ automationFormPage }, gender: Gender) => {
  await automationFormPage.expectGenderSelected(gender);
});

When('I select the days {string}', async ({ automationFormPage }, days: string) => {
  await automationFormPage.selectDays(splitList(days) as Day[]);
});

Then('only the days {string} should be checked', async ({ automationFormPage }, days: string) => {
  await automationFormPage.expectOnlyDaysChecked(splitList(days) as Day[]);
});

When('I select {string} as the country', async ({ automationFormPage }, country: string) => {
  await automationFormPage.selectCountry(country);
});

Then('the country dropdown should have {string} selected', async ({ automationFormPage }, country: string) => {
  await automationFormPage.expectCountrySelected(country);
});

When('I select the colors {string}', async ({ automationFormPage }, colors: string) => {
  await automationFormPage.selectColors(splitList(colors));
});

When('I select the animals {string}', async ({ automationFormPage }, animals: string) => {
  await automationFormPage.selectAnimals(splitList(animals));
});

Then('the selected colors should be {string}', async ({ automationFormPage }, colors: string) => {
  await automationFormPage.expectColorsSelected(splitList(colors));
});

Then('the selected animals should be {string}', async ({ automationFormPage }, animals: string) => {
  await automationFormPage.expectAnimalsSelected(splitList(animals));
});

When(
  'I set the start date to {string} and end date to {string}',
  async ({ automationFormPage }, start: string, end: string) => {
    await automationFormPage.setDateRange(start, end);
  }
);

When('I submit the form', async ({ automationFormPage }) => {
  await automationFormPage.submit();
});

Then('I should see the result message {string}', async ({ automationFormPage }, message: string) => {
  await automationFormPage.expectResultMessage(message);
});
