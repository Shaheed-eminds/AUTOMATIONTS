import { Page, expect } from '@playwright/test';

/**
 * Every page object extends this. It only holds behaviour that is truly
 * shared across pages (navigation, generic waits) — page-specific
 * locators and actions belong in the subclass, never here.
 */
export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string = ''): Promise<void> {
    await this.page.goto(path);
  }

  async waitForUrlContains(fragment: string): Promise<void> {
    await this.page.waitForURL(new RegExp(fragment));
  }

  async title(): Promise<string> {
    return this.page.title();
  }

  /** Onboardly wizard screens are all in the DOM at once, toggled via
   * `display:none` — visibility is what actually proves "which screen am I on". */
  async expectScreenVisible(screen: number | 'success'): Promise<void> {
    await expect(this.page.getByTestId(`screen-${screen}`)).toBeVisible();
  }

  async expectStepActive(step: number): Promise<void> {
    await expect(this.page.getByTestId(`step-chip-${step}`)).toHaveClass(/active/);
  }
}
