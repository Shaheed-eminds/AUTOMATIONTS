import { Locator, Page, expect, test } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '../config/env';

export class ReviewTimesheetPage extends BasePage {
    private readonly pagetext: Locator;
    private readonly submitcaseButton: Locator;
    //private readonly fillTimesheetDate: Locator;
   


    constructor(page: Page) {
    super(page);
    this.pagetext = page.getByTestId('step-chip-3');
    //this.fillTimesheetDate = page.getByTestId('input-ts-date-0');
   // this.SelectProject = page.getByTestId('select-ts-project-0');
    //this.fillTaskDesc = page.getByTestId('input-ts-task-0');
    //this.fillWorkHours = page.getByTestId('input-ts-hours-0');
    this.submitcaseButton = page.getByTestId('btn-submit');

    }
 async open(): Promise<void> {
   // await this.page.waitForTimeout(10000);
          await expect(this.pagetext).toBeVisible({     
            timeout: 60000
          });
        }

        async submitCase(): Promise<void> {
          await this.page.waitForTimeout(10000);
    await this.submitcaseButton.click();
  }

    }