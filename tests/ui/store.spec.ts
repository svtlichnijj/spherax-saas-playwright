import { test, expect } from '~fixtures/ui-fixtures.js';
import { ProductPage } from '~pages/ProductPage.js';

test.describe('Store Page', () => {
  test.beforeEach(async ({ storePage }) => {
    await storePage.open();
  });

  test.describe.serial('App Cards', () => {
    test('Load apps', async ({ storePage }) => {
      await storePage.cardsComponent.scrollToContainerAndWait();
      await storePage.loadAllAppCards(31);
    });

    test('Load all apps and open details about a random one', async ({ storePage, page }) => {
      await storePage.cardsComponent.scrollToContainerAndWait();
      await storePage.loadAllAppCards();

      const count = await storePage.cardsComponent.getCardsCount();
      expect(count).toBeGreaterThan(0);

      const clickedCardData = await storePage.clickRandomAppCard();

      const productPage = new ProductPage(page, (clickedCardData.index + 1).toString());
      await productPage.expectUrlContains();
      await productPage.expectUrlContains((clickedCardData.index + 1).toString());

      expect(await productPage.getTitle()).toEqual(clickedCardData.title);
      expect(await productPage.getDescription()).toEqual(clickedCardData.description);
    });
  });
});
