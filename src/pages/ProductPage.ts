import type { Page } from '@playwright/test';
import { BasePage } from '~pages/BasePage.js';
import { CardComponent } from '~pages/components/CardsComponent.js';

export class ProductPage extends BasePage {
  readonly cardContainer: CardComponent;

  constructor(
    page: Page,
    public readonly productId: string
  ) {
    const baseUrl = process.env.SPHERAX_STORE_URL || 'https://store.dev01.sphrx.xyz';
    const productUrl = new URL(`/product/${productId}`, baseUrl).href;
    super(page, productUrl);
    this.cardContainer = new CardComponent(page.locator('.MuiCard-root'));
  }

  async getTitle() {
    return await this.cardContainer.getCartTitle();
  }

  async getDescription() {
    return await this.cardContainer.getCartDescription();
  }
}
