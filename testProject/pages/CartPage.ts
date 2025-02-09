import { Locator, Page } from "@playwright/test";
import { ItemPage } from "./ItemPage";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  private itemPage: ItemPage;
  private requestWhenCartIsUpdated: string =
    "fc=module&module=ps_shoppingcart&controller=ajax";
  private requestUpdatedAmount: string =
    "fc=module&module=ps_shoppingcart&controller=ajax";

  amountOfAddedItemLocator: Locator;
  addedItemLocator: Locator;
  private removeItemFromCartBtn: Locator;
  proceedToCheckoutBtn: Locator;

  constructor(page: Page) {
    super(page);
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
    const waitTillNeededResponse = super.responseWaiter(
      this.requestUpdatedAmount
    );
    await this.itemPage.changeAmountOfNeededItem(action);
    await waitTillNeededResponse;
  }

  async waitItemsAppearance(expectedAmount = 1) {
    await super.waitElementsAppearance(this.addedItemLocator, expectedAmount);
  }

  async removeItem(itemOrder = 0) {
    await this.page.waitForLoadState("load");

    const waitUpdatingStateOfCart = super.responseWaiter(
      this.requestWhenCartIsUpdated
    );

    await this.removeItemFromCartBtn.nth(itemOrder).click();

    await waitUpdatingStateOfCart;
    await this.page.reload();
    await this.page.waitForLoadState("load");
  }
}
