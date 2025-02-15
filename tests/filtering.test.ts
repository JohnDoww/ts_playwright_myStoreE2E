import { test } from "@playwright/test";
import { guest } from "../fixtures/fixtures";

test.describe("Filtering", () => {
  guest(
    "STORE-003: Filter amount display right amount of items",
    async ({ shopPages }) => {
      await shopPages.catalog.goTo();
      const filterOptions = await shopPages.catalog.getCompositionFilters();

      await shopPages.catalog.compareAmountItemsOnPageAndOnFilter(
        filterOptions
      );
    }
  );
});
