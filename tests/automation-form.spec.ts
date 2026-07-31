import { test } from '../src/fixtures/pageFixtures';

test.describe('Automation Practice - Data Entry Form', () => {
  test.beforeEach(async ({ automationFormPage }) => {
    await automationFormPage.open();
  });

  test('fills in personal details', async ({ automationFormPage }) => {
    await automationFormPage.fillPersonalDetails({
      name: 'John Doe',
      email: 'john.doe@test.com',
      phone: '9876543210',
      address: '123 Test Street, NY',
    });

    await automationFormPage.expectFieldValue('name', 'John Doe');
    await automationFormPage.expectFieldValue('email', 'john.doe@test.com');
    await automationFormPage.expectFieldValue('phone', '9876543210');
    await automationFormPage.expectFieldValue('address', '123 Test Street, NY');
  });

  test('selects gender, days, country, colors and animals', async ({ automationFormPage }) => {
    await automationFormPage.selectGender('female');
    await automationFormPage.expectGenderSelected('female');

    await automationFormPage.selectDays(['monday', 'wednesday', 'friday']);
    await automationFormPage.expectDaysChecked(['monday', 'wednesday', 'friday']);
    await automationFormPage.expectDaysUnchecked(['sunday', 'tuesday', 'thursday', 'saturday']);

    await automationFormPage.selectCountry('India');
    await automationFormPage.expectCountrySelected('India');

    await automationFormPage.selectColors(['blue', 'green']);
    await automationFormPage.expectColorsSelected(['blue', 'green']);

    await automationFormPage.selectAnimals(['lion', 'fox']);
    await automationFormPage.expectAnimalsSelected(['lion', 'fox']);
  });

  test('calculates the selected date range on submit', async ({ automationFormPage }) => {
    await automationFormPage.setDateRange('2026-08-01', '2026-08-10');
    await automationFormPage.submit();

    await automationFormPage.expectResultMessage('You selected a range of 9 days.');
  });

  test('rejects an end date before the start date', async ({ automationFormPage }) => {
    await automationFormPage.setDateRange('2026-08-10', '2026-08-01');
    await automationFormPage.submit();

    await automationFormPage.expectResultMessage('End date must be after start date.');
  });

  test('prompts for both dates when submitted empty', async ({ automationFormPage }) => {
    await automationFormPage.submit();

    await automationFormPage.expectResultMessage('Please select both start and end dates.');
  });
});
