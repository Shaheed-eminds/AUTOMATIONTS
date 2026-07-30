import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  private readonly pageHeader: Locator;
  private readonly userDropdown: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeader = page.locator('.oxd-topbar-header-breadcrumb h6');
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.logoutLink = page.getByRole('menuitem', { name: 'Logout' });
  }

  async expectLoaded(): Promise<void> {
    // Wait for the post-login redirect before asserting the header — this
    // demo site's redirect can lag, and without this the header assertion's
    // own timeout would fire while still on the login page, which reads as
    // "text never appeared" rather than the real cause, "never navigated".
    await this.waitForUrlContains('dashboard');
    await expect(this.pageHeader).toHaveText('Dashboard');
  }

  async logout(): Promise<void> {
    await this.userDropdown.click();
    await this.logoutLink.click();
  }
}
