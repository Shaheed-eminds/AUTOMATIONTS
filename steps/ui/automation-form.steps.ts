import { createBdd } from 'playwright-bdd';
import { test } from '../../src/fixtures/pageFixtures';
import { Day, Gender } from '../../src/pages/AutomationFormPage';

const { Given, When, Then } = createBdd(test);

const ALL_DAYS: Day[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

Given('I am on the automation practice form page', async ({ automationFormPage }) => {
  await automationFormPage.open();
});

When('I enter the name {string}', async ({ automationFormPage }, name: string) => {
  await automationFormPage.fillPersonalDetails({ name });
});

When('I enter the email {string}', async ({ automationFormPage }, email: string) => {
  await automationFormPage.fillPersonalDetails({ email });
});

When('I enter the phone {string}', async ({ automationFormPage }, phone: string) => {
  await automationFormPage.fillPersonalDetails({ phone });
});

When('I enter the address {string}', async ({ automationFormPage }, address: string) => {
  await automationFormPage.fillPersonalDetails({ address });
});

Then('the name field should contain {string}', async ({ automationFormPage }, value: string) => {
  await automationFormPage.expectFieldValue('name', value);
});

Then('the email field should contain {string}', async ({ automationFormPage }, value: string) => {
  await automationFormPage.expectFieldValue('email', value);
});

Then('the phone field should contain {string}', async ({ automationFormPage }, value: string) => {
  await automationFormPage.expectFieldValue('phone', value);
});

Then('the address field should contain {string}', async ({ automationFormPage }, value: string) => {
  await automationFormPage.expectFieldValue('address', value);
});

When('I select {string} as the gender', async ({ automationFormPage }, gender: Gender) => {
  await automationFormPage.selectGender(gender);
});

Then('the {string} gender option should be selected', async ({ automationFormPage }, gender: Gender) => {
  await automationFormPage.expectGenderSelected(gender);
});

When('I select the days {string}', async ({ automationFormPage }, days: string) => {
  const dayList = days.split(',').map((day) => day.trim()) as Day[];
  await automationFormPage.selectDays(dayList);
});

Then('only the days {string} should be checked', async ({ automationFormPage }, days: string) => {
  const checkedDays = days.split(',').map((day) => day.trim()) as Day[];
  const uncheckedDays = ALL_DAYS.filter((day) => !checkedDays.includes(day));
  await automationFormPage.expectDaysChecked(checkedDays);
  await automationFormPage.expectDaysUnchecked(uncheckedDays);
});

When('I select {string} as the country', async ({ automationFormPage }, country: string) => {
  await automationFormPage.selectCountry(country);
});

Then('the country dropdown should have {string} selected', async ({ automationFormPage }, country: string) => {
  await automationFormPage.expectCountrySelected(country);
});

When('I select the colors {string}', async ({ automationFormPage }, colors: string) => {
  const colorList = colors.split(',').map((color) => color.trim());
  await automationFormPage.selectColors(colorList);
});

Then('the selected colors should be {string}', async ({ automationFormPage }, colors: string) => {
  await automationFormPage.expectColorsSelected(colors.split(',').map((c) => c.trim()));
});

When('I select the animals {string}', async ({ automationFormPage }, animals: string) => {
  const animalList = animals.split(',').map((animal) => animal.trim());
  await automationFormPage.selectAnimals(animalList);
});

Then('the selected animals should be {string}', async ({ automationFormPage }, animals: string) => {
  await automationFormPage.expectAnimalsSelected(animals.split(',').map((a) => a.trim()));
});

When('I set the start date to {string}', async ({ automationFormPage }, start: string) => {
  await automationFormPage.fillStartDate(start);
});

When('I set the end date to {string}', async ({ automationFormPage }, end: string) => {
  await automationFormPage.fillEndDate(end);
});

When('I submit the form', async ({ automationFormPage }) => {
  await automationFormPage.submit();
});

Then('I should see the result message {string}', async ({ automationFormPage }, message: string) => {
  await automationFormPage.expectResultMessage(message);
});
