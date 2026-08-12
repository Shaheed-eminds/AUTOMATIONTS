import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TimesheetPage extends BasePage {
  private readonly nextButton: Locator;
  private readonly timesheetError: Locator;

  constructor(page: Page) {
    super(page);
    this.nextButton = page.getByTestId('btn-next-3');
    this.timesheetError = page.getByTestId('timesheet-error');
  }

  // entryNumber is 1-based, matching the feature wording ("timesheet entry 1").
  async fillEntry(entryNumber: number, date: string, project: string, task: string, hours: string): Promise<void> {
    const idx = entryNumber - 1;
    await this.page.getByTestId(`input-ts-date-${idx}`).fill(date);
    await this.page.getByTestId(`select-ts-project-${idx}`).selectOption({ label: project });
    await this.page.getByTestId(`input-ts-task-${idx}`).fill(task);
    await this.page.getByTestId(`input-ts-hours-${idx}`).fill(hours);
  }

  async goNext(): Promise<void> {
    await this.nextButton.click();
  }

  async expectRequiredFieldError(): Promise<void> {
    await expect(this.timesheetError).toBeVisible();
  }
}
