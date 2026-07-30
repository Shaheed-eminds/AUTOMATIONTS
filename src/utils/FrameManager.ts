import { FrameLocator, Page } from '@playwright/test';

/**
 * Tracks which frame generic actions (click/fill) should run against.
 * `Page` and `FrameLocator` both expose `.locator()`, so callers can treat
 * `resolve()`'s return value uniformly without caring whether it's the
 * top-level page or an iframe.
 */
export class FrameManager {
  private selector: string | null = null;

  useFrame(selector: string): void {
    this.selector = selector;
  }

  useDefaultContent(): void {
    this.selector = null;
  }

  isInFrame(): boolean {
    return this.selector !== null;
  }

  resolve(page: Page): Page | FrameLocator {
    return this.selector ? page.frameLocator(this.selector) : page;
  }
}
