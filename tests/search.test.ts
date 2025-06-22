import { expect } from "@playwright/test";
import { guestTest } from "../fixtures/fixtures";

guestTest.describe("Search", { tag: "@S75685dfd" }, () => {
  guestTest(
    "STORE-001: Found items contain search word",
    { tag: "@T1a2b3c4d5" },
    async ({ shopPages }) => {
      const searchRequest = "Mug";
      await shopPages.home.searchForItem(searchRequest);
      const allItems = await shopPages.catalog.returnAllItemsDescriptionOnPage();

      for (let item of allItems) {
        await expect(item).toContainText(searchRequest, { ignoreCase: true });
      }
    }
  ) ;

  guestTest(
    "STORE-002. Proposed items in search match with request",
    { tag: "@T2b3c4d5e6" },
    async ({ shopPages }) => {
      const searchRequest = "frame";
      await shopPages.home.fillInSearch(searchRequest);
      const searchProposals =
        await shopPages.home.returnProposedItemsInSearch();

      for (let item of searchProposals) {
        await expect(item).toContainText(searchRequest, { ignoreCase: true });
      }
    }
  );
});
