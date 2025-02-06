import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CatalogPage {
  protected page: Page;
  itemDescriptionLocator: Locator;
  compositionFiltersLocator: Locator;
  amountOfItemsForExactFilter: Locator;
  private basePage: BasePage;

  constructor(page: Page) {
    this.page = page;
    this.basePage = new BasePage(page);
    this.itemDescriptionLocator = page.locator(".product-description a");
    this.compositionFiltersLocator = page.locator(
      '//*[contains(text(), "Composition")]//following-sibling::ul//li'
    );
  }

  async openItem(itemOrder: number = 0) {
    await this.itemDescriptionLocator.nth(itemOrder).waitFor();
    await this.itemDescriptionLocator.nth(itemOrder).click();
  }

  async returnAllItemsDescriptionOnPage() {
    await this.itemDescriptionLocator.last().waitFor();
    return await this.itemDescriptionLocator.all();
  }


  async setFilter(filterToActivate) {
    await filterToActivate.waitFor();
    await filterToActivate.click();
  }

  async returnItemAmountForFilter(filterLocator) {
    await filterLocator.first().waitFor();

    const productsAmountOnFilter = await filterLocator
      .locator("//a//span")
      .innerText();
    const amountAsString = productsAmountOnFilter.match(/(\d+)/);
    let numberAmount = 0;
    if (Array.isArray(amountAsString)) {
      numberAmount = parseInt(amountAsString[0]);
    }
    return numberAmount;
  }

  async compareAmountItemsOnPageAndOnFilter(filterOptions) {
    for (const testFilter of await filterOptions) {
      await testFilter.waitFor();
      await testFilter.click();

      await this.basePage.loaderHandler();

      const itemsForFilter = await this.returnItemAmountForFilter(
        await testFilter
      );

      const exactAmountOfProducts =
        await this.returnAllItemsDescriptionOnPage();

      expect(itemsForFilter).toBe(exactAmountOfProducts.length);

      await testFilter.click();
    }
  }
}
