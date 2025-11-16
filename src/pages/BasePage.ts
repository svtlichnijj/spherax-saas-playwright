import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { HeaderComponent } from './components/HeaderComponent.js';

export class BasePage {
  readonly endpoint: string;
  readonly header: HeaderComponent;

  constructor(
    protected readonly page: Page,
    endpoint: string
  ) {
    this.page = page;
    this.endpoint = endpoint;
    this.header = new HeaderComponent(page);
  }

  async open(path?: string) {
    await this.page.goto(path ?? this.endpoint);
  }

  async expectUrlContains(part?: string) {
    await expect(this.page).toHaveURL(new RegExp(part === undefined ? this.endpoint : part));
  }
}
