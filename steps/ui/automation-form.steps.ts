import { createBdd, DataTable } from 'playwright-bdd';
import { test } from '../../src/fixtures/pageFixtures';
import { Day, Gender, PersonalDetailField } from '../../src/pages/AutomationFormPage';

const { Given, When, Then } = createBdd(test);

Given('I am on the automation practice form page', async ({ automationFormPage }) => {
  await automationFormPage.open();
});

When('I enter the following personal details', async ({ automationFormPage }, 
  table: DataTable) => {
  await automationFormPage.fillPersonalDetails(table.rowsHash() as Record<PersonalDetailField, string>);
});

Then('the {word} field should contain {string}', async ({ automationFormPage }, field: PersonalDetailField, value: string) => {
  await automationFormPage.expectFieldValue(field, value);
});

When('I select {string} as the gender', async ({ automationFormPage }, gender: Gender) => {
  await automationFormPage.selectGender(gender);
});

Then('the {string} gender option should be selected', async ({ automationFormPage }, gender: Gender) => {
  await automationFormPage.expectGenderSelected(gender);
});

When('I select the following days', async ({ automationFormPage }, table: DataTable) => {
  await automationFormPage.selectDays(table.raw().map((row) => row[0]) as Day[]);
});

Then('the following days should be checked', async ({ automationFormPage }, table: DataTable) => {
  await automationFormPage.expectDaysChecked(table.raw().map((row) => row[0]) as Day[]);
});

Then('the following days should not be checked', async ({ automationFormPage }, table: DataTable) => {
  await automationFormPage.expectDaysUnchecked(table.raw().map((row) => row[0]) as Day[]);
});

When('I select {string} as the country', async ({ automationFormPage }, country: string) => {
  await automationFormPage.selectCountry(country);
});

Then('the country dropdown should have {string} selected', async ({ automationFormPage }, country: string) => {
  await automationFormPage.expectCountrySelected(country);
});

When('I select the following colors', async ({ automationFormPage }, table: DataTable) => {
  await automationFormPage.selectColors(table.raw().map((row) => row[0]));
});

When('I select the following animals', async ({ automationFormPage }, table: DataTable) => {
  await automationFormPage.selectAnimals(table.raw().map((row) => row[0]));
});

Then('the selected colors should be {string}', async ({ automationFormPage }, colors: string) => {
  await automationFormPage.expectColorsSelected(colors.split(',').map((c) => c.trim()));
});

Then('the selected animals should be {string}', async ({ automationFormPage }, animals: string) => {
  await automationFormPage.expectAnimalsSelected(animals.split(',').map((a) => a.trim()));
});

When('I set the start date to {string} and end date to {string}', async ({ automationFormPage }, start: string, end: string) => {
  await automationFormPage.setDateRange(start, end);
});

When('I submit the form', async ({ automationFormPage }) => {
  await automationFormPage.submit();
});

Then('I should see the result message {string}', async ({ automationFormPage }, message: string) => {
  await automationFormPage.expectResultMessage(message);
});
