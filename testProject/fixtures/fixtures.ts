import { test } from "@playwright/test";
import { PageHolder } from "../pages/PageHolder";
import { getNewRegUserStorageState } from "../utils/helpers/apiRequests";

type ShopPages = {
  shopPages: PageHolder;
};
export const guest = test.extend<ShopPages>({
  shopPages: async ({ page }, use) => {
    const shopPages = new PageHolder(page);

    await shopPages.base.goTo();
    await shopPages.page.waitForLoadState();

    await use(shopPages);
  },
});

export const loginUser = test.extend<ShopPages>({
  shopPages: async ({ browser }, use) => {
    const savedStorageState = await getNewRegUserStorageState();

    const context = await browser.newContext({
      storageState: savedStorageState,
    });
    const page = await context.newPage();
    const shopPages = new PageHolder(page);

    await shopPages.base.goTo();
    await shopPages.page.waitForLoadState();

    await use(shopPages);
  },
});
