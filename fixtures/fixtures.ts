import { test } from "@playwright/test";
import { PageHolder } from "../app/pages/PageHolder";

import { getNewRegUserStorageState } from "../utils/helpers/apiRequests";

type ShopPages = {
  shopPages: PageHolder;
};
export const guestTest = test.extend<ShopPages>({
  shopPages: async ({ page }, use) => {
    const shopPages = new PageHolder(page);

    await shopPages.home.goTo();
    await page.waitForLoadState();

    await use(shopPages);
  }
});

export const loginUserTest = test.extend<ShopPages>({
  shopPages: async ({ browser }, use) => {
    const savedStorageState = await getNewRegUserStorageState();

    const context = await browser.newContext({
      storageState: savedStorageState
    });
    const page = await context.newPage();
    const shopPages = new PageHolder(page);

    await shopPages.home.goTo();
    await page.waitForLoadState();

    await use(shopPages);
  }
});
