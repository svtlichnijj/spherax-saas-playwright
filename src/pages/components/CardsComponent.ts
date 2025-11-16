import type { Locator } from '@playwright/test';

export class CardsComponent {
  readonly container: Locator;
  readonly cardsBlock: Locator;

  constructor(container: Locator) {
    this.container = container;
    this.cardsBlock = this.container.locator('.MuiCardContent-root');
  }

  async scrollToContainerAndWait() {
    await this.container.scrollIntoViewIfNeeded();
    await this.cardsBlock.first().waitFor({ state: 'visible', timeout: 10000 });
  }

  async getCardsCount(): Promise<number> {
    return await this.cardsBlock.count();
  }

  async getCartTitle(cart: Locator) {
    const title = await cart.locator('.MuiTypography-body1').textContent();
    return title != null ? title.trim() : '';
  }

  async getCartDescription(cart: Locator) {
    const description = await cart.locator(' > .MuiTypography-body2').textContent();
    return description != null ? description?.trim() : '';
  }
}

export class CardComponent extends CardsComponent {
  readonly cardBlock: Locator;

  constructor(container: Locator) {
    super(container);
    this.cardBlock = this.cardsBlock.first();
  }

  async getCartTitle() {
    return await super.getCartTitle(this.cardBlock);
  }

  async getCartDescription() {
    return await super.getCartDescription(this.cardBlock);
  }
}
