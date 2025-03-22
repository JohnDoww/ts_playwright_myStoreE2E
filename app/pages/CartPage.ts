import { Page } from "@playwright/test";
import { step } from "../../utils/helpers/stepDecorator";
import { ItemPage } from "./ItemPage";
import { CartSummary } from "../components/CartSummary.component";
import { BasePage } from "./BasePage.abstract";

export class CartPage extends BasePage {
  private itemPage: ItemPage;
  private cartSummaryComp: CartSummary;
  private url: string = "/controller=cart&action=show";
  private requestWhenCartIsUpdated: string =
    "fc=module&module=ps_shoppingcart&controller=ajax";
  private requestUpdatedAmount: string =
    "fc=module&module=ps_shoppingcart&controller=ajax";

  constructor(page: Page) {
    super(page);
    this.cartSummaryComp = new CartSummary(page);
    this.itemPage = new ItemPage(page);
  }

  @step("Open cart page")
  async goTo() {
    await this.page.goto(this.url);
  }

  @step("Get added item")
  async addedItem() {
    return this.cartSummaryComp.addedItem;
  }

  @step("Get all added item")
  async allAddedItem() {
    await this.waitItemsAppearance();
    return await this.helper.returnAllLocators(this.cartSummaryComp.addedItem);
  }

  @step("Get amount of added item")
  async getAmountOfAddedItem(locatorOrder: number = 0) {
    await this.cartSummaryComp.addedItem.nth(locatorOrder).waitFor();
    const amount = await this.cartSummaryComp.amountPerAddedItem
      .nth(locatorOrder)
      .inputValue();
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
    await this.helper.waitElementsAppearance(
      this.cartSummaryComp.addedItem,
      expectedAmount
    );
  }

  @step("Delete item from cart")
  async removeItem(itemOrder = 0) {
    await this.page.waitForLoadState("load");

    const waitUpdatingStateOfCart = this.helper.responseWaiter(
      this.requestWhenCartIsUpdated
    );
    await this.cartSummaryComp.removeItem(itemOrder);
    await waitUpdatingStateOfCart;
    await this.page.reload();
    await this.page.waitForLoadState("load");
  }

  @step("Proceed to checkout")
  async clickProceedToCheckoutBtn() {
    await this.cartSummaryComp.clickOnProceedToCheckoutBtn();
  }
}
