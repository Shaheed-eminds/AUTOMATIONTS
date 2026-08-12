
import { Locator, Page, expect, test } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '../config/env';

// Enter Login details Username and Password

export class LoginDetailsPage extends BasePage {
  private readonly pagetext: Locator;
  private readonly UserNameInput: Locator;
  private readonly PasswordInput: Locator;
  private readonly UserNameError: Locator;


  private readonly SignInButton: Locator;
 
    constructor(Loginge: Page) {
    super(Loginge);
    this.pagetext = Loginge.getByTestId('login-screen');
    this.UserNameInput = Loginge.getByTestId('input-username');
    this.PasswordInput = Loginge.getByTestId('input-password');
    this.UserNameError = Loginge.getByTestId('login-error');

    this.SignInButton = Loginge.getByTestId('btn-login');
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
    await this.page.waitForTimeout(5000);
  }

    async expectUserNameError(): Promise<void> {
    const expected = 'Enter both username and password.';
    await test.step(`UserName error -> expected: "${expected}"`, async () => {
      const actual = await this.UserNameError.textContent();
      console.log(`fullName error -> expected: "${expected}", actual: "${actual}", match: ${actual === expected}`);
      await expect(this.UserNameError).toHaveText(expected);
    });
 }

}

