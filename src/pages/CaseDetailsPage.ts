import { Locator, Page, expect, test } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '../config/env';


export class CaseDetailsPage extends BasePage {
  //private readonly fullNameInput: Locator;
  // private readonly fullNameError: Locator;
  //private readonly employeeID: Locator;
  // private readonly emailaddress: Locator;
  private readonly nextButton: Locator;

  constructor(page: Page) {
    super(page);
    //this.fullNameInput = page.getByTestId('input-fullName');
    // this.fullNameError = page.getByTestId('error-fullName');
    //this.employeeID = page.getByTestId('input-employeeId');
   //this.emailaddress = page.getByTestId('error-email');
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

//   async fillFullName(name: string): Promise<void> {
//     await this.fullNameInput.fill(name);
//   }
//  async fillEmployeeID(EmpID: string): Promise<void> {
//     await this.employeeID.fill(EmpID);
//   }

async goNext(): Promise<void> {
    await this.nextButton.click();
  }



};
