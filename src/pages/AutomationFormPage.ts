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

const ALL_DAYS: Day[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

/**
 * Covers the "Data Entry Form" widget on the public practice page
 * (testautomationpractice.blogspot.com/2018/09/automation-form.html).
 *
 * Note: the "Submit" button's onclick runs `calculateRange()`, a date-range
 * calculator that reads #start-date/#end-date and writes into #result — it
 * does not validate or submit the name/email/phone/address fields. That's a
 * quirk of the demo page, not a bug in this framework.
 */
export class AutomationFormPage extends BasePage {
  private readonly nameInput: Locator;
  private readonly emailInput: Locator;
  private readonly phoneInput: Locator;
  private readonly addressInput: Locator;

  private readonly maleRadio: Locator;
  private readonly femaleRadio: Locator;

  private readonly sundayCheckbox: Locator;
  private readonly mondayCheckbox: Locator;
  private readonly tuesdayCheckbox: Locator;
  private readonly wednesdayCheckbox: Locator;
  private readonly thursdayCheckbox: Locator;
  private readonly fridayCheckbox: Locator;
  private readonly saturdayCheckbox: Locator;

  private readonly countrySelect: Locator;
  private readonly colorsSelect: Locator;
  private readonly animalsSelect: Locator;

  private readonly startDateInput: Locator;
  private readonly endDateInput: Locator;

  private readonly submitButton: Locator;
  private readonly resultText: Locator;

  constructor(page: Page) {
    super(page);

    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.phoneInput = page.locator('#phone');
    this.addressInput = page.locator('#textarea');

    this.maleRadio = page.locator('#male');
    this.femaleRadio = page.locator('#female');

    this.sundayCheckbox = page.locator('#sunday');
    this.mondayCheckbox = page.locator('#monday');
    this.tuesdayCheckbox = page.locator('#tuesday');
    this.wednesdayCheckbox = page.locator('#wednesday');
    this.thursdayCheckbox = page.locator('#thursday');
    this.fridayCheckbox = page.locator('#friday');
    this.saturdayCheckbox = page.locator('#saturday');

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

  // --- Personal details --------------------------------------------------

  async fillPersonalDetails(details: PersonalDetails): Promise<void> {
    await this.nameInput.fill(details.name);
    await this.emailInput.fill(details.email);
    await this.phoneInput.fill(details.phone);
    await this.addressInput.fill(details.address);
  }

  async expectFieldValue(field: PersonalDetailField, value: string): Promise<void> {
    await expect(this.fieldInput(field)).toHaveValue(value);
  }

  private fieldInput(field: PersonalDetailField): Locator {
    if (field === 'name') return this.nameInput;
    if (field === 'email') return this.emailInput;
    if (field === 'phone') return this.phoneInput;
    return this.addressInput;
  }

  // --- Gender --------------------------------------------------------------

  async selectGender(gender: Gender): Promise<void> {
    await this.genderRadio(gender).check();
  }

  async expectGenderSelected(gender: Gender): Promise<void> {
    await expect(this.genderRadio(gender)).toBeChecked();
  }

  private genderRadio(gender: Gender): Locator {
    return gender === 'male' ? this.maleRadio : this.femaleRadio;
  }

  // --- Days of the week ------------------------------------------------------

  async selectDays(days: Day[]): Promise<void> {
    for (const day of days) {
      await this.dayCheckbox(day).check();
    }
  }

  async expectDaysChecked(days: Day[]): Promise<void> {
    for (const day of days) {
      await expect(this.dayCheckbox(day)).toBeChecked();
    }
  }

  async expectDaysUnchecked(days: Day[]): Promise<void> {
    for (const day of days) {
      await expect(this.dayCheckbox(day)).not.toBeChecked();
    }
  }

  /** Checks that exactly `days` are checked, and every other day of the week is not. */
  async expectOnlyDaysChecked(days: Day[]): Promise<void> {
    await this.expectDaysChecked(days);
    const otherDays = ALL_DAYS.filter((day) => !days.includes(day));
    await this.expectDaysUnchecked(otherDays);
  }

  private dayCheckbox(day: Day): Locator {
    switch (day) {
      case 'sunday':
        return this.sundayCheckbox;
      case 'monday':
        return this.mondayCheckbox;
      case 'tuesday':
        return this.tuesdayCheckbox;
      case 'wednesday':
        return this.wednesdayCheckbox;
      case 'thursday':
        return this.thursdayCheckbox;
      case 'friday':
        return this.fridayCheckbox;
      case 'saturday':
        return this.saturdayCheckbox;
    }
  }

  // --- Country, colors, animals (dropdowns) -----------------------------

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
    const selected = await this.selectedOptionValues(this.colorsSelect);
    this.expectSameValues(selected, colors);
  }

  /** `animals` are option values, e.g. ["lion", "fox"] (lowercase, as in the option markup). */
  async selectAnimals(animals: string[]): Promise<void> {
    await this.animalsSelect.selectOption(animals);
  }

  async expectAnimalsSelected(animals: string[]): Promise<void> {
    const selected = await this.selectedOptionValues(this.animalsSelect);
    this.expectSameValues(selected, animals);
  }

  private async selectedOptionValues(select: Locator): Promise<string[]> {
    return select.evaluate((element: HTMLSelectElement) =>
      Array.from(element.selectedOptions).map((option) => option.value)
    );
  }

  // Multi-select option order doesn't have to match the order values were
  // passed in, so compare sorted copies instead of the arrays directly.
  private expectSameValues(actual: string[], expected: string[]): void {
    expect([...actual].sort()).toEqual([...expected].sort());
  }

  // --- Date range and submit ----------------------------------------------

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
