import { guestTest } from "../fixtures/fixtures";

guestTest.describe("Filtering", { tag: "@S12a14931" }, () => {
  guestTest(
    "STORE-003: Filter amount display right amount of items",
    { tag: "@Tbf3ff2dc" },
    async ({ shopPages }) => {
      await shopPages.catalog.goTo();
      const filterOptions = await shopPages.catalog.getCompositionFilters();

      await shopPages.catalog.compareAmountItemsOnPageAndOnFilter(
        filterOptions
      );
    }
  );
});
