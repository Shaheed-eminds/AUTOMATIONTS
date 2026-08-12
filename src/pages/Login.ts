import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '../config/env';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;
  private readonly loginScreen: Locator;
  private readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByTestId('input-username');
    this.passwordInput = page.getByTestId('input-password');
    this.signInButton = page.getByTestId('btn-login');
    this.loginScreen = page.getByTestId('login-screen');
    this.logoutButton = page.getByTestId('btn-logout');
  }

  async open(): Promise<void> {
    await this.goto(env.caseProAppUrl);
  }

  async expectOnLoginScreen(): Promise<void> {
    await expect(this.loginScreen).toBeVisible();
  }

  async signIn(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async logOut(): Promise<void> {
    await this.logoutButton.click();
  }
}
