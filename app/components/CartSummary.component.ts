import { Page, Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class CartSummary extends BaseComp {
  private removeItemBtn: Locator = this.page.locator(
    ".remove-from-cart .material-icons"
  );
  private proceedToCheckoutBtn: Locator = this.page.locator(".checkout .btn");
  readonly addedItem: Locator = this.page.locator("li.cart-item");
  readonly amountPerAddedItem: Locator = this.page.locator(
    '[name="product-quantity-spin"]'
  );

  constructor(page: Page) {
    super(page);
  }

  async removeItem(itemOrder = 0) {
    await this.removeItemBtn.nth(itemOrder).click();
  }

  async clickOnProceedToCheckoutBtn() {
    await this.proceedToCheckoutBtn.click();
  }
}
