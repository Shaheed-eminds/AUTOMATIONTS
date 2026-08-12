import { Locator, Page, expect, test } from '@playwright/test';
import { BasePage } from './BasePage';
//import { casedetailspage } from './CasedetailsPage';
import { env } from '../config/env';


// The three Case Type options on the form- radiobutton.
export type CaseType =
  | 'Incident'
  | 'Service Request'
  | 'Change Request';

export class CaseDetailsPage extends BasePage {
   private readonly pagetext: Locator;
  private readonly textSubject: Locator;
  private readonly selectCategory: Locator;
 // private readonly selectCaseType: Locator;
  private readonly incidentRadio: Locator;
  private readonly serviceRequestRadio: Locator
  private readonly changeRequestRadio: Locator;
  private readonly fillDescription: Locator;
  private readonly nextButton: Locator;

  constructor(page: Page) {
    super(page);
      this.pagetext = page.getByTestId('step-chip-2');
    this.textSubject = page.getByTestId('input-subject');
    this.selectCategory = page.getByTestId('select-category');
    //this.selectCaseType = page.getByTestId('radio-caseType-incident');
    this.fillDescription = page.getByTestId('input-description');
    this.incidentRadio = page.getByTestId('radio-caseType-incident');
    this.serviceRequestRadio = page.getByTestId('radio-caseType-servicerequest');
    this.changeRequestRadio = page.getByTestId('radio-caseType-changerequest');
    //this.countryError = page.getByTestId('error-country');
    //this.stateSelect = page.getByTestId('select-state');
    //this.stateError = page.getByTestId('error-state');
    //this.citySelect = page.getByTestId('select-city');
    //this.cityError = page.getByTestId('error-city');
    this.nextButton = page.getByTestId('btn-next-2');
  }

  //async open(): Promise<void> {
    //await this.goto(env.onboardlyAppUrl);
    //await this.goto(env.caseProAppUrl);
  //}

 async open(): Promise<void> {
   // await this.page.waitForTimeout(10000);
          await expect(this.pagetext).toBeVisible({     
            timeout: 60000
          });
        }


 async fillSubject(subject: string): Promise<void> {
  await this.textSubject.fill(subject);
  }


  // Category has the option text you see in the dropdown, e.g. "Engineering/ Sales/Finance".
  async fillCategory(category: string): Promise<void> {
    await this.selectCategory.selectOption({ label: category });
    await this.selectCategory.selectOption({ index: 1 });
  }

  async selectCaseType(type: CaseType): Promise<void> {
    if (type === 'Incident') {
      await this.incidentRadio.check();
    } else if (type === 'Service Request') {
      await this.serviceRequestRadio.check();
    } else if (type === 'Change Request') {
      await this.changeRequestRadio.check();
    }
  }

   async enterDescription(description: string): Promise<void> {
  await this.fillDescription.fill(description);
  }


async goNext(): Promise<void> {
  await this.page.waitForTimeout(10000);
    await this.nextButton.click();
  }

};
