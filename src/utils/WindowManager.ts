import { BrowserContext, Page } from '@playwright/test';

/**
 * Tracks every page/tab opened in a BrowserContext and which one is
 * "active". Playwright's `page` fixture is a single fixed reference for
 * the whole test — this fills the gap for scenarios that open a new tab
 * (target="_blank" links, window.open) and need to act on it, then
 * switch back, the way Selenium's window handles used to work.
 */
export class WindowManager {
  private readonly pages: Page[];
  private activeIndex = 0;

  constructor(context: BrowserContext, initialPage: Page) {
    this.pages = [initialPage];
    context.on('page', (newPage) => {
      this.pages.push(newPage);
      this.activeIndex = this.pages.length - 1;
    });
  }

  get active(): Page {
    return this.pages[this.activeIndex];
  }

  count(): number {
    return this.pages.length;
  }

  switchTo(index: number): void {
    if (index < 0 || index >= this.pages.length) {
      throw new Error(
        `No window at index ${index}. Currently tracking ${this.pages.length} window(s).`
      );
    }
    this.activeIndex = index;
  }

  switchToFirst(): void {
    this.switchTo(0);
  }

  switchToLatest(): void {
    this.switchTo(this.pages.length - 1);
  }

  async closeActive(): Promise<void> {
    const closing = this.active;
    await closing.close();
    this.pages.splice(this.activeIndex, 1);
    this.activeIndex = Math.max(0, this.activeIndex - 1);
  }
}
