import { Page, Locator } from "@playwright/test";

export class FilterSections {
  protected page: Page;
  compositionSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.compositionSection = page.locator(
      '//*[contains(text(), "Composition")]//following-sibling::ul//li'
    );
  }

  itemsPerFilter(filter: Locator) {
    const amountOfItems: Locator = filter.locator("//a//span");
    return amountOfItems;
  }
  checkbox(filter: Locator) {
    const checkboxForFilter: Locator = filter.locator(
      "//*[@class='custom-checkbox']"
    );
    return checkboxForFilter;
  }
}
