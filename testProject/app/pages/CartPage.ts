import { Locator, Page } from "@playwright/test";
import { ItemPage } from "./ItemPage";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  private itemPage: ItemPage;
  private requestWhenCartIsUpdated: string =
    "fc=module&module=ps_shoppingcart&controller=ajax";
  private requestUpdatedAmount: string =
    "fc=module&module=ps_shoppingcart&controller=ajax";

  constructor(page: Page) {
    super(page);
    this.itemPage = new ItemPage(page);
  }

  async getAmountOfAddedItem(locatorOrder: number = 0) {
    await this.cartSummaryComp.addedItem.nth(locatorOrder).waitFor();
    return await this.cartSummaryComp.amountPerAddedItem
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
    await super.waitElementsAppearance(
      this.cartSummaryComp.addedItem,
      expectedAmount
    );
  }

  async removeItem(itemOrder = 0) {
    await this.page.waitForLoadState("load");

    const waitUpdatingStateOfCart = super.responseWaiter(
      this.requestWhenCartIsUpdated
    );

    await this.cartSummaryComp.removeItem(itemOrder);

    await waitUpdatingStateOfCart;
    await this.page.reload();
    await this.page.waitForLoadState("load");
  }

  async clickProceedToCheckoutBtn() {
    await this.cartSummaryComp.clickOnProceedToCheckoutBtn();
  }
}
