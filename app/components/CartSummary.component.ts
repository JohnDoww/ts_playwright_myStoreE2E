import { Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class CartSummary extends BaseComp {
  private removeItemBtn: Locator = this.page.locator(".remove-from-cart .material-icons");
  private proceedToCheckoutBtn: Locator = this.page.locator(".checkout .btn");
  private addedItem: Locator = this.page.locator("li.cart-item");
  private amountPerAddedItem: Locator = this.page.locator('[name="product-quantity-spin"]');

  async clickRemoveItemBtn(itemOrder: number) {
    await this.removeItemBtn.nth(itemOrder).click();
  }

  async clickProceedToCheckoutBtn() {
    await this.proceedToCheckoutBtn.click();
  }

  getAddedItemLocator() {
    return this.addedItem;
  }

  async getAmountPerItemLocator(itemOrder: number) {
    await this.amountPerAddedItem.nth(itemOrder).waitFor();
    return this.amountPerAddedItem.nth(itemOrder);
  }
}
