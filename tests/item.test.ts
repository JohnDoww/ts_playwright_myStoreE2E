import { expect } from "@playwright/test";
import { guestTest } from "../fixtures/fixtures";

guestTest.describe("Item", { tag: "@Sbfd0a3d8" }, () => {
  guestTest(
    "STORE-004: Title from item preview match with titles on the item page",
    { tag: "@T1d846792" },
    async ({ shopPages }) => {
      const itemTitle = await shopPages.catalog.getItemTitle(0);

      await shopPages.catalog.openItem(0);

      await expect(await shopPages.item.getBreadcrumb()).toContainText(
        itemTitle,
        { ignoreCase: true }
      );
      await expect(await shopPages.item.getTitle()).toContainText(itemTitle, {
        ignoreCase: true
      });
    }
  );
});
