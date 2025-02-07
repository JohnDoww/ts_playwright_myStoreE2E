import { Locator, Page, expect } from "@playwright/test";
import { ItemPage } from "./ItemPage";

export class CartPage {
  private page: Page;
  private itemPage: ItemPage;
  amountOfAddedItemLocator: Locator;
  addedItemLocator: Locator;
  private removeItemFromCartBtn: Locator;
  proceedToCheckoutBtn: Locator;



  constructor(page: Page) {
    this.page = page;
    this.itemPage = new ItemPage(page);
    this.amountOfAddedItemLocator = page.locator(
      '[name="product-quantity-spin"]'
    );
    this.addedItemLocator = page.locator("li.cart-item");
    this.removeItemFromCartBtn = page.locator(
      ".remove-from-cart .material-icons"
    );
    this.proceedToCheckoutBtn = this.page.locator(".checkout .btn");
  }

  async getAmountOfAddedItem(locatorOrder: number = 0) {
    await this.amountOfAddedItemLocator.nth(locatorOrder).waitFor();
    return await this.amountOfAddedItemLocator
      .nth(locatorOrder)
      .getAttribute("value");
  }

  async changeAmountOfAddedItem(action: "+" | "-") {
    const waitTillNeededResponse = this.page.waitForResponse(
      RegExp("^.*\\action=refresh\\b.*$")
    );
    await this.itemPage.changeAmountOfNeededItem(action);
    await waitTillNeededResponse;
  }

  async waitTillItemsAppearance(expectedAmount = 1) {
    await expect
      .poll(
        async () => {
          let visibleItem = 0;
          for (const element of await this.addedItemLocator.all()) {
            if (await element.isVisible()) visibleItem++;
          }
          return visibleItem;
        },
        {
          intervals: [500, 1_000],
          timeout: 30_000,
        }
      )
      .toBe(expectedAmount);
  }

  async removeItem(itemOrder = 0) {
    await this.page.waitForLoadState('load');
    const waitUpdatingStateOfCart = this.page.waitForResponse((response) =>
      response
        .url()
        .includes("fc=module&module=ps_shoppingcart&controller=ajax")
    );

    await this.removeItemFromCartBtn.nth(itemOrder).click();

    await waitUpdatingStateOfCart;
    await this.page.reload();
    await this.page.waitForLoadState('load');

  }
}
