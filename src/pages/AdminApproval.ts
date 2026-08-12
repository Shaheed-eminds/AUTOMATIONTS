import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminApprovalPage extends BasePage {
  private readonly caseDetailStatus: Locator;
  private readonly approveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.caseDetailStatus = page.getByTestId('case-detail-status');
    this.approveButton = page.getByTestId('btn-approve');
  }

  async approve(): Promise<void> {
    await this.approveButton.click();
  }

  async expectCaseStatus(status: string): Promise<void> {
    await expect(this.caseDetailStatus).toHaveText(status);
  }
}
