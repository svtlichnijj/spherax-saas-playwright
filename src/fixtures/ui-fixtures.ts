import { test as base } from '@playwright/test';
import { StorePage } from '~pages/StorePage.js';

type UiFixtures = {
  storePage: StorePage;
};

export const test = base.extend<UiFixtures>({
  storePage: async ({ page }, use) => {
    await use(new StorePage(page));
  },
});

export { expect } from '@playwright/test';
