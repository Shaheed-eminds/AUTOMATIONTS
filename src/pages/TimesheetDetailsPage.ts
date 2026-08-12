import { Locator, Page, expect, test } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '../config/env';

export class TimesheetDetailsPage extends BasePage {
     private readonly pagetext: Locator;
     private readonly nextButton: Locator;
    private readonly fillTimesheetDate: Locator;
    private readonly SelectProject: Locator;
    private readonly fillTaskDesc: Locator;
     private readonly fillWorkHours: Locator;


    constructor(page: Page) {
    super(page);
    this.pagetext = page.getByTestId('step-chip-3');
    this.fillTimesheetDate = page.getByTestId('input-ts-date-0');
    this.SelectProject = page.getByTestId('select-ts-project-0');
    this.fillTaskDesc = page.getByTestId('input-ts-task-0');
    this.fillWorkHours = page.getByTestId('input-ts-hours-0');
    this.nextButton = page.getByTestId('btn-next-3');

    }
 async open(): Promise<void> {
   // await this.page.waitForTimeout(10000);
          await expect(this.pagetext).toBeVisible({     
            timeout: 60000
          });
        }


 async EnterTimesheetDate(date: string): Promise<void> {
  await this.fillTimesheetDate.fill(date);
 }

  // Department has the option text you see in the dropdown, e.g. "Engineering/ Sales/Finance".
  async ChoiceProject(project: string): Promise<void> {
    //await this.SelectProject.selectOption({ label: project });
    await this.SelectProject.selectOption({ index: 2 });
  }

 async EnterTaskDesc(taskDesc: string): Promise<void> {
  await this.fillTaskDesc.fill(taskDesc);
 }

 async EnterWorkHours(workHours: string): Promise<void> {
  await this.fillWorkHours.fill(workHours);
 }

 async goNext(): Promise<void> {
  await this.page.waitForTimeout(10000);
    await this.nextButton.click();
  }
}





