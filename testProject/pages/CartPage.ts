import { Locator, Page, expect } from "@playwright/test";
import { ItemPage } from "./ItemPage";

export class CartPage {
  private page: Page;
  itemPage: ItemPage;
  amountOfAddedItemLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemPage = new ItemPage(page);
    this.amountOfAddedItemLocator = page.locator('[name="product-quantity-spin"]');
  }

  async getAmountOfAddedItem(locatorOrder: number = 0) {
    await this.amountOfAddedItemLocator.nth(locatorOrder).waitFor();
    return await this.amountOfAddedItemLocator
      .nth(locatorOrder)
      .getAttribute("value");
  }

  async increaseAmountOfAddedItem() {
    const waitTillNeededResponse = this.page.waitForResponse(
      RegExp("^.*\\action=refresh\\b.*$")
    );

    await this.itemPage.increaseItemAmountLocator.click();

    await waitTillNeededResponse;
  }
}
