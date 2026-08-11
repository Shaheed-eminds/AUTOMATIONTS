import { Locator, Page, expect, test } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '../config/env';


// The three Priority options on the form- radiobutton.
export type PriorityType =
  | 'Low'
  | 'Medium'
  | 'High'
    'Critical';


export class RequesterDetailsPage extends BasePage {
  private readonly fullNameInput: Locator;
  // private readonly fullNameError: Locator;
  private readonly employeeID: Locator;
  private readonly emailAddress: Locator;
  private readonly DepartmentSelect: Locator;
  private readonly lowpriorityRadio: Locator;
  private readonly mediumpriorityRadio: Locator;
  private readonly highpriorityRadio: Locator;
  private readonly criticalpriorityRadio: Locator;
  private readonly nextButton: Locator;

  constructor(page: Page) {
    super(page);
    this.fullNameInput = page.getByTestId('input-fullName');
    // this.fullNameError = page.getByTestId('error-fullName');
    this.employeeID = page.getByTestId('input-employeeId');
    this.emailAddress = page.getByTestId('input-email');
    this.DepartmentSelect = page.getByTestId('select-department');
    this.lowpriorityRadio = page.getByTestId('radio-priority-low');
    this.mediumpriorityRadio = page.getByTestId('radio-priority-medium');
    this.highpriorityRadio = page.getByTestId('radio-priority-high');
    this.criticalpriorityRadio = page.getByTestId('radio-priority-critical');
    //this.countrySelect = page.getByTestId('select-country');
    //this.countryError = page.getByTestId('error-country');
    //this.stateSelect = page.getByTestId('select-state');
    //this.stateError = page.getByTestId('error-state');
    //this.citySelect = page.getByTestId('select-city');
    //this.cityError = page.getByTestId('error-city');
    this.nextButton = page.getByTestId('btn-next-1');
  }

  async open(): Promise<void> {
    //await this.goto(env.onboardlyAppUrl);
    await this.goto(env.caseProAppUrl);
  }

  async fillFullName(name: string): Promise<void> {
    await this.fullNameInput.fill(name);
  }
 async fillEmployeeID(EmpID: string): Promise<void> {
    await this.employeeID.fill(EmpID);
  }

   async fillEmailAddress(email: string): Promise<void> {
    await this.emailAddress.fill(email);
  }

  // Department has the option text you see in the dropdown, e.g. "Engineering/ Sales/Finance".
  async selectDepartment(department: string): Promise<void> {
    await this.DepartmentSelect.selectOption({ label: department });
  }
  async selectPriority(type: PriorityType): Promise<void> {
    if (type === 'Low') {
      await this.lowpriorityRadio.check();
    } else if (type === 'Medium') {
      await this.mediumpriorityRadio.check();
    } else if (type === 'High') {
      await this.highpriorityRadio.check();
    } else if (type === 'Critical') {
      await this.criticalpriorityRadio.check();
    }
  }

 async goNext(): Promise<void> {
    await this.nextButton.click();
  }



};
