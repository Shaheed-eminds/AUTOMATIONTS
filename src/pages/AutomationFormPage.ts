import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '../config/env';

export type Gender = 'male' | 'female';
export type Day = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
export type PersonalDetailField = 'name' | 'email' | 'phone' | 'address';

export interface PersonalDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}


export class AutomationFormPage extends BasePage {
  private readonly personalDetailFields: Record<PersonalDetailField, Locator>;
  private readonly genderRadios: Record<Gender, Locator>;
  private readonly dayCheckboxes: Record<Day, Locator>;
  private readonly countrySelect: Locator;
  private readonly colorsSelect: Locator;
  private readonly animalsSelect: Locator;
  private readonly startDateInput: Locator;
  private readonly endDateInput: Locator;
  private readonly submitButton: Locator;
  private readonly resultText: Locator;

  constructor(page: Page) {
    super(page);
    this.personalDetailFields = {
      name: page.locator('#name'),
      email: page.locator('#email'),
      phone: page.locator('#phone'),
      address: page.locator('#textarea'),
    };
    this.genderRadios = {
      male: page.locator('#male'),
      female: page.locator('#female'),
    };
    this.dayCheckboxes = {
      sunday: page.locator('#sunday'),
      monday: page.locator('#monday'),
      tuesday: page.locator('#tuesday'),
      wednesday: page.locator('#wednesday'),
      thursday: page.locator('#thursday'),
      friday: page.locator('#friday'),
      saturday: page.locator('#saturday'),
    };
    this.countrySelect = page.locator('#country');
    this.colorsSelect = page.locator('#colors');
    this.animalsSelect = page.locator('#animals');
    this.startDateInput = page.locator('#start-date');
    this.endDateInput = page.locator('#end-date');
    this.submitButton = page.locator('.submit-btn');
    this.resultText = page.locator('#result');
  }

  async open(): Promise<void> {
    await this.goto(env.automationPracticeUrl);
  }

  async fillPersonalDetails(details: Partial<PersonalDetails>): Promise<void> {
    for (const [field, value] of Object.entries(details) as [PersonalDetailField, string][]) {
      await this.personalDetailFields[field].fill(value);
    }
  }

  async expectFieldValue(field: PersonalDetailField, value: string): Promise<void> {
    await expect(this.personalDetailFields[field]).toHaveValue(value);
  }

  async selectGender(gender: Gender): Promise<void> {
    await this.genderRadios[gender].check();
  }

  async expectGenderSelected(gender: Gender): Promise<void> {
    await expect(this.genderRadios[gender]).toBeChecked();
  }

  async selectDays(days: Day[]): Promise<void> {
    for (const day of days) {
      await this.dayCheckboxes[day].check();
    }
  }

  async expectDaysChecked(days: Day[]): Promise<void> {
    for (const day of days) {
      await expect(this.dayCheckboxes[day]).toBeChecked();
    }
  }

  async expectDaysUnchecked(days: Day[]): Promise<void> {
    for (const day of days) {
      await expect(this.dayCheckboxes[day]).not.toBeChecked();
    }
  }

  /** `country` is the option's visible label, e.g. "India". */
  async selectCountry(country: string): Promise<void> {
    await this.countrySelect.selectOption({ label: country });
  }

  async expectCountrySelected(country: string): Promise<void> {
    await expect(this.countrySelect.locator('option:checked')).toHaveText(country);
  }

  /** `colors` are option values, e.g. ["blue", "green"] (lowercase, as in the option markup). */
  async selectColors(colors: string[]): Promise<void> {
    await this.colorsSelect.selectOption(colors);
  }

  async expectColorsSelected(colors: string[]): Promise<void> {
    await this.expectSelectedValues(this.colorsSelect, colors);
  }

  /** `animals` are option values, e.g. ["lion", "fox"] (lowercase, as in the option markup). */
  async selectAnimals(animals: string[]): Promise<void> {
    await this.animalsSelect.selectOption(animals);
  }

  async expectAnimalsSelected(animals: string[]): Promise<void> {
    await this.expectSelectedValues(this.animalsSelect, animals);
  }

  // selectOption's array order (or the DOM's option order) doesn't have to
  // match the caller's order, so compare sorted sets rather than relying on
  // toHaveText's element-order matching.
  private async expectSelectedValues(select: Locator, expected: string[]): Promise<void> {
    await expect
      .poll(async () =>
        (
          await select.evaluate((el: HTMLSelectElement) => Array.from(el.selectedOptions).map((o) => o.value))
        ).sort()
      )
      .toEqual([...expected].sort());
  }

  /** `start`/`end` are ISO dates (yyyy-mm-dd), matching the native date inputs' format. */
  async setDateRange(start: string, end: string): Promise<void> {
    await this.startDateInput.fill(start);
    await this.endDateInput.fill(end);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async expectResultMessage(message: string): Promise<void> {
    await expect(this.resultText).toHaveText(message);
  }
}
