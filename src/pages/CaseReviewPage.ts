import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CaseReviewPage extends BasePage {
  private readonly summaryFullName: Locator;
  private readonly submitButton: Locator;
  private readonly successHeading: Locator;
  private readonly caseId: Locator;

  constructor(page: Page) {
    super(page);
    this.summaryFullName = page.getByTestId('summary-fullName');
    this.submitButton = page.getByTestId('btn-submit');
    this.successHeading = page.locator('[data-testid="screen-success"] h2');
    this.caseId = page.getByTestId('case-id');
  }

  async expectRequesterSummaryContains(fullName: string): Promise<void> {
    await expect(this.summaryFullName).toHaveText(fullName);
  }

  async expectCaseSummaryContains(text: string): Promise<void> {
    await expect(this.page.getByTestId('screen-4')).toContainText(text);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async expectSuccessHeadingVisible(): Promise<void> {
    await expect(this.successHeading).toBeVisible();
  }

  async expectCaseIdVisible(): Promise<void> {
    await expect(this.caseId).toBeVisible();
    await expect(this.caseId).not.toHaveText('');
  }

  async getCaseId(): Promise<string> {
    return (await this.caseId.textContent()) ?? '';
  }
}
