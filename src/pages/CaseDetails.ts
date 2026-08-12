import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CaseDetailsPage extends BasePage {
  private readonly subjectInput: Locator;
  private readonly categorySelect: Locator;
  private readonly impactLevelSelect: Locator;
  private readonly descriptionInput: Locator;
  private readonly nextButton: Locator;
  private readonly subjectError: Locator;
  private readonly categoryError: Locator;
  private readonly caseTypeError: Locator;
  private readonly descriptionError: Locator;

  constructor(page: Page) {
    super(page);
    this.subjectInput = page.getByTestId('input-subject');
    this.categorySelect = page.getByTestId('select-category');
    this.impactLevelSelect = page.getByTestId('select-impactLevel');
    this.descriptionInput = page.getByTestId('input-description');
    this.nextButton = page.getByTestId('btn-next-2');
    this.subjectError = page.getByTestId('error-subject');
    this.categoryError = page.getByTestId('error-category');
    this.caseTypeError = page.getByTestId('error-caseType');
    this.descriptionError = page.getByTestId('error-description');
  }

  async fillSubject(subject: string): Promise<void> {
    await this.subjectInput.fill(subject);
  }

  async selectCategory(category: string): Promise<void> {
    await this.categorySelect.selectOption({ label: category });
  }

  async selectCaseType(caseType: string): Promise<void> {
    const key = caseType.replace(/\s+/g, '').toLowerCase();
    await this.page.getByTestId(`radio-caseType-${key}`).check();
  }

  async selectImpactLevel(impactLevel: string): Promise<void> {
    await this.impactLevelSelect.selectOption({ label: impactLevel });
  }

  async fillDescription(description: string): Promise<void> {
    await this.descriptionInput.fill(description);
  }

  async goNext(): Promise<void> {
    await this.nextButton.click();
  }

  async expectAllRequiredFieldErrors(): Promise<void> {
    await expect(this.subjectError).toBeVisible();
    await expect(this.categoryError).toBeVisible();
    await expect(this.caseTypeError).toBeVisible();
    await expect(this.descriptionError).toBeVisible();
  }
}
