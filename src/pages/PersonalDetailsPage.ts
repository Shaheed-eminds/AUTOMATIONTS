import { Locator, Page, expect, test } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '../config/env';

// The three employment type options on the form.
export type EmploymentType =
  | 'full-time'
  | 'contract'
  | 'intern';

export class PersonalDetailsPage extends BasePage {
  private readonly fullNameInput: Locator;
  private readonly fullNameError: Locator;
  private readonly emailInput: Locator;
  private readonly emailError: Locator;
  private readonly countrySelect: Locator;
  private readonly countryError: Locator;
  private readonly stateSelect: Locator;
  private readonly stateError: Locator;
  private readonly citySelect: Locator;
  private readonly cityError: Locator;
  private readonly fullTimeRadio: Locator;
  private readonly contractRadio: Locator;
  private readonly internRadio: Locator;
  private readonly employmentTypeError: Locator;
  private readonly contractMonthsInput: Locator;
  private readonly contractMonthsError: Locator;
  private readonly universityInput: Locator;
  private readonly universityError: Locator;
  private readonly nextButton: Locator;

  constructor(page: Page) {
    super(page);
    this.fullNameInput = page.getByTestId('input-fullName');
    this.fullNameError = page.getByTestId('error-fullName');
    this.emailInput = page.getByTestId('input-email');
    this.emailError = page.getByTestId('error-email');
    this.countrySelect = page.getByTestId('select-country');
    this.countryError = page.getByTestId('error-country');
    this.stateSelect = page.getByTestId('select-state');
    this.stateError = page.getByTestId('error-state');
    this.citySelect = page.getByTestId('select-city');
    this.cityError = page.getByTestId('error-city');
    this.fullTimeRadio = page.getByTestId('radio-employmentType-fulltime');
    this.contractRadio = page.getByTestId('radio-employmentType-contract');
    this.internRadio = page.getByTestId('radio-employmentType-intern'); 
    this.employmentTypeError = page.getByTestId('error-employmentType');
    this.contractMonthsInput = page.getByTestId('input-contractMonths');
    this.contractMonthsError = page.getByTestId('error-contractMonths');
    this.universityInput = page.getByTestId('input-university');
    this.universityError = page.getByTestId('error-university');
    this.nextButton = page.getByTestId('btn-next-1');
  }

  async open(): Promise<void> {
    await this.goto(env.onboardlyAppUrl);
  }

  async fillFullName(name: string): Promise<void> {
    await this.fullNameInput.fill(name);
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  // country/state/city are the option text you see in the dropdown, e.g. "India".
  async selectCountry(country: string): Promise<void> {
    await this.countrySelect.selectOption({ label: country });
  }

  async selectState(state: string): Promise<void> {
    await this.stateSelect.selectOption({ label: state });
  }

  async selectCity(city: string): Promise<void> {
    await this.citySelect.selectOption({ label: city });
  }

  async selectEmploymentType(type: EmploymentType): Promise<void> {
    if (type === 'full-time') {
      await this.fullTimeRadio.check();
    } else if (type === 'contract') {
      await this.contractRadio.check();
    } else if (type === 'intern') {
      await this.internRadio.check();
    }
  }

  async fillContractMonths(months: string): Promise<void> {
    await this.contractMonthsInput.fill(months);
  }

  async fillUniversity(university: string): Promise<void> {
    await this.universityInput.fill(university);
  }

  async goNext(): Promise<void> {
    await this.nextButton.click();
  }

  async expectStateEnabled(): Promise<void> {
    await expect(this.stateSelect).toBeEnabled();
  }

  async expectStateOptions(labels: string[]): Promise<void> {
    const options = this.stateSelect.locator('option').filter({ hasNotText: 'Select' });
    await expect(options).toHaveText(labels);
  }

  async expectCityOptions(labels: string[]): Promise<void> {
    const options = this.citySelect.locator('option').filter({ hasNotText: 'Select' });
    await expect(options).toHaveText(labels);
  }

  async expectContractMonthsVisible(): Promise<void> {
    await expect(this.contractMonthsInput).toBeVisible();
  }

  async expectContractMonthsHidden(): Promise<void> {
    await expect(this.contractMonthsInput).toBeHidden();
  }

  async expectUniversityVisible(): Promise<void> {
    await expect(this.universityInput).toBeVisible();
  }

  async expectUniversityHidden(): Promise<void> {
    await expect(this.universityInput).toBeHidden();
  }

  async expectFullNameError(): Promise<void> {
    const expected = 'Full name is required.';
    await test.step(`fullName error -> expected: "${expected}"`, async () => {
      const actual = await this.fullNameError.textContent();
      console.log(`fullName error -> expected: "${expected}", actual: "${actual}", match: ${actual === expected}`);
      await expect(this.fullNameError).toHaveText(expected);
    });
  }

  async expectEmailError(): Promise<void> {
    const expected = 'Enter a valid email address.';
    await test.step(`email error -> expected: "${expected}"`, async () => {
      const actual = await this.emailError.textContent();
      console.log(`email error -> expected: "${expected}", actual: "${actual}", match: ${actual === expected}`);
      await expect(this.emailError).toHaveText(expected);
    });
  }

  async expectCountryError(): Promise<void> {
    const expected = 'Country is required.';
    await test.step(`country error -> expected: "${expected}"`, async () => {
      const actual = await this.countryError.textContent();
      console.log(`country error -> expected: "${expected}", actual: "${actual}", match: ${actual === expected}`);
      await expect(this.countryError).toHaveText(expected);
    });
  }

  async expectStateError(): Promise<void> {
    const expected = 'State is required.';
    await test.step(`state error -> expected: "${expected}"`, async () => {
      const actual = await this.stateError.textContent();
      console.log(`state error -> expected: "${expected}", actual: "${actual}", match: ${actual === expected}`);
      await expect(this.stateError).toHaveText(expected);
    });
  }

  async expectCityError(): Promise<void> {
    const expected = 'City is required.';
    await test.step(`city error -> expected: "${expected}"`, async () => {
      const actual = await this.cityError.textContent();
      console.log(`city error -> expected: "${expected}", actual: "${actual}", match: ${actual === expected}`);
      await expect(this.cityError).toHaveText(expected);
    });
  }

  async expectEmploymentTypeError(): Promise<void> {
    const expected = 'Select an employment type.';
    await test.step(`employmentType error -> expected: "${expected}"`, async () => {
      const actual = await this.employmentTypeError.textContent();
      console.log(`employmentType error -> expected: "${expected}", actual: "${actual}", match: ${actual === expected}`);
      await expect(this.employmentTypeError).toHaveText(expected);
    });
  }

  async expectAllRequiredFieldErrors(): Promise<void> {
    await this.expectFullNameError();
    await this.expectEmailError();
    await this.expectCountryError();
    await this.expectStateError();
    await this.expectCityError();
    await this.expectEmploymentTypeError();
  }
}
