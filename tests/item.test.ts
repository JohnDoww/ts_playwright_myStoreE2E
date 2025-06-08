import { test, expect } from "@playwright/test";
import { guest } from "../fixtures/fixtures";

test.describe("Item", () => {
  guest(
    "STORE-004: Title from item preview match with titles on the item page",
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
