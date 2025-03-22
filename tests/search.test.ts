import { expect, test } from "@playwright/test";
import { guest } from "../fixtures/fixtures";

test.describe("Search", () => {
  guest(
    "STORE-001: Found items contain search word",
    async ({ shopPages }) => {
      const searchRequest = "Mug";
      await shopPages.home.searchForItem(searchRequest);
      const allItems =
        await shopPages.catalog.returnAllItemsDescriptionOnPage();

      for (let item of allItems) {
        await expect(item).toContainText(searchRequest, { ignoreCase: true });
      }
    }
  );

  guest(
    "STORE-002. Proposed items in search match with request",
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
