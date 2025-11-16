import { BasePage } from './BasePage.js';
import type { Page } from '@playwright/test';
import { CardsComponent } from '~pages/components/CardsComponent.js';
import type { AppCardData } from '~types/ui.store.types.js';

export class StorePage extends BasePage {
  readonly cardsComponent: CardsComponent;

  constructor(page: Page) {
    super(page, process.env.SPHERAX_STORE_URL || 'https://store.dev01.sphrx.xyz/');

    this.cardsComponent = new CardsComponent(page.locator('.MuiGrid-container'));
  }

  async loadAllAppCards(maxCards = 0, loadTimeout = 5000) {
    let currentCount = 0;

    await this.cardsComponent.cardsBlock.first().waitFor({ state: 'attached', timeout: 10000 });
    let newCount = await this.cardsComponent.getCardsCount();

    while (newCount > currentCount) {
      currentCount = newCount;

      if (maxCards > 0 && currentCount >= maxCards) {
        break;
      }

      await this.cardsComponent.cardsBlock.last().scrollIntoViewIfNeeded();

      try {
        await this.cardsComponent.cardsBlock.nth(currentCount).isEnabled({ timeout: loadTimeout });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        break;
      }

      newCount = await this.cardsComponent.getCardsCount();
    }

    return newCount;
  }

  async clickRandomAppCard(): Promise<AppCardData> {
    const count = await this.cardsComponent.getCardsCount();
    if (count === 0) {
      throw new Error('No App cards found on the page.');
    }

    const randomIndex = Math.floor(Math.random() * count);
    const randomCart = this.cardsComponent.cardsBlock.nth(randomIndex);

    const title = await this.cardsComponent.getCartTitle(randomCart);
    const description = await this.cardsComponent.getCartDescription(randomCart);

    await randomCart.click();

    return { title, description, index: randomIndex };
  }
}
