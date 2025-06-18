import { step } from "../../utils/helpers/stepDecorator";
import { ItemPage } from "./ItemPage";
import { CartSummary } from "../components/CartSummary.component";
import { BasePage } from "./BasePage.abstract";

export class CartPage extends BasePage {
  private url: string = "/controller=cart&action=show";
  private requestWhenCartIsUpdated: string =
    "fc=module&module=ps_shoppingcart&controller=ajax";
  private requestUpdatedAmount: string =
    "fc=module&module=ps_shoppingcart&controller=ajax";

  private itemPage: ItemPage = new ItemPage(this.page);
  private cartSummaryComp: CartSummary = new CartSummary(this.page);

  @step("Open cart page")
  async goTo() {
    await this.page.goto(this.url);
  }

  @step("Get added item")
  async addedItem() {
    return this.cartSummaryComp.getAddedItemLocator();
  }

  @step("Get all added item")
  async allAddedItem() {
    await this.waitItemsAppearance();
    return await this.helper.returnAllLocators(this.cartSummaryComp.getAddedItemLocator());
  }

  @step("Get amount of added item")
  async getAmountOfAddedItem(locatorOrder: number = 0) {
    await this.cartSummaryComp.getAddedItemLocator();
    const amount = (
      await this.cartSummaryComp.getAmountPerItemLocator(locatorOrder)
    ).inputValue();
    return amount;
  }

  @step("Change item amount")
  async changeAmountOfAddedItem(action: "+" | "-") {
    const waitTillNeededResponse = this.helper.responseWaiter(
      this.requestUpdatedAmount
    );
    await this.itemPage.changeAmountOfNeededItem(action);
    await waitTillNeededResponse;
  }

  @step("Wait for items")
  async waitItemsAppearance(expectedAmount = 1) {
    const itemLocator = await this.cartSummaryComp.getAddedItemLocator();
    await this.helper.waitElementsAppearance(itemLocator, expectedAmount);
  }

  @step("Delete item from cart")
  async removeItem(itemOrder = 0) {
    await this.page.waitForLoadState("load");

    const waitUpdatingStateOfCart = this.helper.responseWaiter(
      this.requestWhenCartIsUpdated
    );
    await this.cartSummaryComp.clickRemoveItemBtn(itemOrder);
    await waitUpdatingStateOfCart;
    await this.page.reload();
    await this.page.waitForLoadState("load");
  }

  @step("Proceed to checkout")
  async clickProceedToCheckoutBtn() {
    await this.cartSummaryComp.clickProceedToCheckoutBtn();
  }
}
