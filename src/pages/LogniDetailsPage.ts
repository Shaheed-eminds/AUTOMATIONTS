
import { Locator, Page, expect, test } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '../config/env';

// Enter Login details Username and Password

export class LogniDetailsPage extends BasePage {
  private readonly pagetext: Locator;
  private readonly UserNameInput: Locator;
  private readonly PasswordInput: Locator;
  private readonly UserNameError: Locator;
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
  private readonly SignInButton: Locator;
  private readonly nextButton: Locator;

    constructor(page: Page) {
    super(page);
    this.pagetext = page.getByTestId('login-screen');
    this.UserNameInput = page.getByTestId('input-username');
    this.PasswordInput = page.getByTestId('input-password');
    this.UserNameError = page.getByTestId('login-error');
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
     this.SignInButton = page.getByTestId('btn-login');
    this.nextButton = page.getByTestId('btn-next-1');
  }
  
  async open(): Promise<void> {
    await this.goto(env.caseProAppUrl);
    await this.page.waitForTimeout(10000);
          await expect(this.pagetext).toBeVisible({     
            timeout: 60000
          });
        }
 
  async fillUsername(Username: string): Promise<void> {
    await this.UserNameInput.fill(Username);
  }
  
  async fillPassword(password: string): Promise<void> {
    await this.PasswordInput.fill(password);
  }

    async goSignIn(): Promise<void> {
    await this.SignInButton.click();
  
  }

    async expectUserNameError(): Promise<void> {
    const expected = 'UserName is required.';
    await test.step(`UserName error -> expected: "${expected}"`, async () => {
      const actual = await this.UserNameError.textContent();
      console.log(`fullName error -> expected: "${expected}", actual: "${actual}", match: ${actual === expected}`);
      await expect(this.UserNameError).toHaveText(expected);
    });
 }

}

