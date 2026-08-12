import { Locator, Page, expect, test } from '@playwright/test';
import { BasePage } from './BasePage';
//import { casedetailspage } from './CasedetailsPage';
import { env } from '../config/env';


// The three Case Type options on the form- radiobutton.

export class CaseSubmittedPage extends BasePage {
   private readonly pagetext: Locator;

    constructor(page: Page) {
    super(page);
    
    this.pagetext = page.getByTestId('screen-success');

      }

  async open(): Promise<void> {
   // await this.goto(env.caseProAppUrl);
   // await this.page.waitForTimeout(10000);
          await expect(this.pagetext).toBeVisible({     
            timeout: 60000
          });
        }

    };