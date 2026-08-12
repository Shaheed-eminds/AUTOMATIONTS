import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RequesterPage extends BasePage {
  private readonly fullNameInput: Locator;
  private readonly employeeIdInput: Locator;
  private readonly emailInput: Locator;
  private readonly departmentSelect: Locator;
  private readonly nextButton: Locator;
  private readonly fullNameError: Locator;
  private readonly employeeIdError: Locator;
  private readonly emailError: Locator;
  private readonly departmentError: Locator;
  private readonly priorityError: Locator;

  constructor(page: Page) {
    super(page);
    this.fullNameInput = page.getByTestId('input-fullName');
    this.employeeIdInput = page.getByTestId('input-employeeId');
    this.emailInput = page.getByTestId('input-email');
    this.departmentSelect = page.getByTestId('select-department');
    this.nextButton = page.getByTestId('btn-next-1');
    this.fullNameError = page.getByTestId('error-fullName');
    this.employeeIdError = page.getByTestId('error-employeeId');
    this.emailError = page.getByTestId('error-email');
    this.departmentError = page.getByTestId('error-department');
    this.priorityError = page.getByTestId('error-priority');
  }

  async fillFullName(name: string): Promise<void> {
    await this.fullNameInput.fill(name);
  }

  async fillEmployeeId(id: string): Promise<void> {
    await this.employeeIdInput.fill(id);
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async selectDepartment(department: string): Promise<void> {
    await this.departmentSelect.selectOption({ label: department });
  }

  async selectPriority(priority: string): Promise<void> {
    await this.page.getByTestId(`radio-priority-${priority.toLowerCase()}`).check();
  }

  async goNext(): Promise<void> {
    await this.nextButton.click();
  }

  async expectAllRequiredFieldErrors(): Promise<void> {
    await expect(this.fullNameError).toBeVisible();
    await expect(this.employeeIdError).toBeVisible();
    await expect(this.emailError).toBeVisible();
    await expect(this.departmentError).toBeVisible();
    await expect(this.priorityError).toBeVisible();
  }
}
