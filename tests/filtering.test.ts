import { test } from "@playwright/test";
import { guest } from "../fixtures/fixtures";

test.describe("Filtering @S12a14931", () => {
  guest(
    "STORE-003: Filter amount display right amount of items @Tbf3ff2dc",
    async ({ shopPages }) => {
      await shopPages.catalog.goTo();
      const filterOptions = await shopPages.catalog.getCompositionFilters();

      await shopPages.catalog.compareAmountItemsOnPageAndOnFilter(
        filterOptions
      );
    }
  );
});
