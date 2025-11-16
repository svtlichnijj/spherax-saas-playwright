import type { Locator, Page } from '@playwright/test';

export class HeaderComponent {
  readonly headerStoreBlock: Locator;

  constructor(page: Page) {
    this.headerStoreBlock = page.locator('.shared-header');
  }
}
