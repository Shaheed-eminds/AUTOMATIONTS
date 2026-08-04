import { Locator, Page, expect, test } from '@playwright/test';
import { BasePage } from './BasePage';

export type RemoteChoice = 'yes' | 'no';

export class JobDetailsPage extends BasePage {
  private readonly departmentSelect: Locator;
  private readonly departmentError: Locator;
  private readonly roleSelect: Locator;
  private readonly roleError: Locator;
  private readonly salaryBandInput: Locator;
  private readonly reportingManagerInput: Locator;
  private readonly reportingManagerError: Locator;
  private readonly reportingManagerHint: Locator;
  private readonly remoteYesRadio: Locator;
  private readonly remoteNoRadio: Locator;
  private readonly timezoneSelect: Locator;
  private readonly timezoneError: Locator;
  private readonly backButton: Locator;
  private readonly nextButton: Locator;

  constructor(page: Page) {
    super(page);
    this.departmentSelect = page.getByTestId('select-department');
    this.departmentError = page.getByTestId('error-department');
    this.roleSelect = page.getByTestId('select-role');
    this.roleError = page.getByTestId('error-role');
    this.salaryBandInput = page.getByTestId('input-salaryBand');
    this.reportingManagerInput = page.getByTestId('input-reportingManager');
    this.reportingManagerError = page.getByTestId('error-reportingManager');
    this.reportingManagerHint = page.getByTestId('hint-reportingManager');
    this.remoteYesRadio = page.getByTestId('radio-remote-yes');
    this.remoteNoRadio = page.getByTestId('radio-remote-no');
    this.timezoneSelect = page.getByTestId('select-timezone');
    this.timezoneError = page.getByTestId('error-timezone');
    this.backButton = page.getByTestId('btn-back-2');
    this.nextButton = page.getByTestId('btn-next-2');
  }

  // department/role/timezone are the dropdown option text, e.g. "Engineering".
  async selectDepartment(department: string): Promise<void> {
    await this.departmentSelect.selectOption({ label: department });
  }

  async selectRole(role: string): Promise<void> {
    await this.roleSelect.selectOption({ label: role });
  }

  async fillReportingManager(manager: string): Promise<void> {
    await this.reportingManagerInput.fill(manager);
  }

  async selectRemote(remote: RemoteChoice): Promise<void> {
    if (remote === 'yes') {
      await this.remoteYesRadio.check();
    } else {
      await this.remoteNoRadio.check();
    }
  }

  async selectTimezone(timezone: string): Promise<void> {
    await this.timezoneSelect.selectOption({ label: timezone });
  }

  async goNext(): Promise<void> {
    await this.nextButton.click();
  }

  async goBack(): Promise<void> {
    await this.backButton.click();
  }

  async expectSalaryBand(band: string): Promise<void> {
    await expect(this.salaryBandInput).toHaveValue(band);
  }

  async expectReportingManagerDisabled(): Promise<void> {
    await expect(this.reportingManagerInput).toBeDisabled();
  }

  async expectReportingManagerRequired(): Promise<void> {
    await expect(this.reportingManagerInput).toBeEnabled();
    await expect(this.reportingManagerHint).toHaveText('Required for non-Executive departments.');
  }

  async expectTimezoneVisible(): Promise<void> {
    await expect(this.timezoneSelect).toBeVisible();
  }

  async expectTimezoneHidden(): Promise<void> {
    await expect(this.timezoneSelect).toBeHidden();
  }

  async expectTimezoneInvalid(): Promise<void> {
    await expect(this.timezoneError).toBeVisible();
  }

  async expectDepartmentError(): Promise<void> {
    const expected = 'Department is required.';
    await test.step(`department error -> expected: "${expected}"`, async () => {
      const actual = await this.departmentError.textContent();
      console.log(`department error -> expected: "${expected}", actual: "${actual}", match: ${actual === expected}`);
      await expect(this.departmentError).toHaveText(expected);
    });
  }

  async expectRoleError(): Promise<void> {
    const expected = 'Role is required.';
    await test.step(`role error -> expected: "${expected}"`, async () => {
      const actual = await this.roleError.textContent();
      console.log(`role error -> expected: "${expected}", actual: "${actual}", match: ${actual === expected}`);
      await expect(this.roleError).toHaveText(expected);
    });
  }

  async expectReportingManagerError(): Promise<void> {
    const expected = 'Reporting manager is required.';
    await test.step(`reportingManager error -> expected: "${expected}"`, async () => {
      const actual = await this.reportingManagerError.textContent();
      console.log(`reportingManager error -> expected: "${expected}", actual: "${actual}", match: ${actual === expected}`);
      await expect(this.reportingManagerError).toHaveText(expected);
    });
  }

  async expectAllRequiredFieldErrors(): Promise<void> {
    await this.expectDepartmentError();
    await this.expectRoleError();
    await this.expectReportingManagerError();
  }
}
