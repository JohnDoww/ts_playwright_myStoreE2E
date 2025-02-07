import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CatalogPage {
  protected page: Page;
  private basePage: BasePage;
  itemDescriptionLocator: Locator;
  compositionFiltersLocator: Locator;
  amountOfItemsForExactFilter: Locator;
  filterCheckbox: Locator;
  async getFilterCheckbox(filterLocator) {
    return await filterLocator.locator("//*[@class='custom-checkbox']");
  }

  constructor(page: Page) {
    this.page = page;
    this.basePage = new BasePage(page);
    this.itemDescriptionLocator = page.locator(".product-description a");
    this.compositionFiltersLocator = page.locator(
      '//*[contains(text(), "Composition")]//following-sibling::ul//li'
    );
    this.filterCheckbox = page.locator("//*[@class='custom-checkbox']");
  }

  async openItem(itemOrder: number = 0) {
    await this.page.waitForLoadState('load');
    await this.itemDescriptionLocator.nth(itemOrder).waitFor();
    await this.itemDescriptionLocator.nth(itemOrder).click();
    await this.page.waitForLoadState("load");
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
      const filterCheckbox = await this.getFilterCheckbox(testFilter);

      await this.page.waitForLoadState("load");
      await testFilter.waitFor();
      const waitTillNeededResponse = this.page.waitForResponse(
        RegExp("^.*\\module=productcomments&controller=CommentGrade\\b.*$")
      )
      await filterCheckbox.click();
      await expect(await filterCheckbox).toBeChecked({ timeout: 20_000 });
      await waitTillNeededResponse;

      await this.basePage.loaderHandler();
      await this.page.waitForLoadState("load");

      const itemsForFilter = await this.returnItemAmountForFilter(
        await testFilter
      );

      const exactAmountOfProducts =
        await this.returnAllItemsDescriptionOnPage();

      expect(itemsForFilter).toBe(exactAmountOfProducts.length);

      await filterCheckbox.click();

      await this.basePage.loaderHandler();
      await this.page.waitForLoadState("load");
    }
  }
}
