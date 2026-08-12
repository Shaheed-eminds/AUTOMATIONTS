import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminDashboardPage extends BasePage {
  private readonly dashboard: Locator;
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.dashboard = page.getByTestId('admin-dashboard');
    this.searchInput = page.getByTestId('input-search-caseId');
    this.searchButton = page.getByTestId('btn-search');
  }

  async expectOnDashboard(): Promise<void> {
    await expect(this.dashboard).toBeVisible();
  }

  async searchForCaseId(caseId: string): Promise<void> {
    await this.searchInput.fill(caseId);
    await this.searchButton.click();
  }
}
