import { Locator, Page, expect, test } from '@playwright/test';
import { BasePage } from './BasePage';

export class ReviewPage extends BasePage {
  private readonly editScreen1Link: Locator;
  private readonly editScreen2Link: Locator;
  private readonly editScreen3Link: Locator;
  private readonly backButton: Locator;
  private readonly submitButton: Locator;
  private readonly submissionId: Locator;
  private readonly restartButton: Locator;
  private readonly successHeading: Locator;
  private readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.editScreen1Link = page.getByTestId('edit-screen-1');
    this.editScreen2Link = page.getByTestId('edit-screen-2');
    this.editScreen3Link = page.getByTestId('edit-screen-3');
    this.backButton = page.getByTestId('btn-back-4');
    this.submitButton = page.getByTestId('btn-submit');
    this.submissionId = page.getByTestId('submission-id');
    this.restartButton = page.getByTestId('btn-restart');
    this.successHeading = page.locator('#screen-success h2');
    this.successMessage = page.locator('#screen-success p');
  }

  async editScreen1(): Promise<void> {
    await this.editScreen1Link.click();
  }

  async editScreen2(): Promise<void> {
    await this.editScreen2Link.click();
  }

  async editScreen3(): Promise<void> {
    await this.editScreen3Link.click();
  }

  async goBack(): Promise<void> {
    await this.backButton.click();
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  // prefix is the fixed part of the generated id, e.g. "OB" for ids like "OB-ML7IMU".
  async expectSubmissionIdVisible(prefix: string): Promise<void> {
    await expect(this.submissionId).toContainText(`${prefix}-`);
  }

  async expectSuccessHeading(heading: string): Promise<void> {
    await expect(this.successHeading).toHaveText(heading);
  }

  async expectSuccessMessage(message: string): Promise<void> {
    await expect(this.successMessage).toHaveText(message);
  }

  // Reads the generated id off the success screen so it can be stored/logged by the caller.
  async getSubmissionId(): Promise<string> {
    return test.step('capture submission id', async () => {
      const id = await this.submissionId.textContent();
      console.log(`captured submission id: ${id}`);
      return id ?? '';
    });
  }

  async restart(): Promise<void> {
    await this.restartButton.click();
  }
}
