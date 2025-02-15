import { Page, Locator } from "@playwright/test";

export class CartSummary {
  protected page: Page;
  private removeItemBtn: Locator;
  private proceedToCheckoutBtn: Locator;
  addedItem: Locator;
  amountPerAddedItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addedItem = page.locator("li.cart-item");
    this.amountPerAddedItem = page.locator('[name="product-quantity-spin"]');
    this.removeItemBtn = page.locator(".remove-from-cart .material-icons");
    this.proceedToCheckoutBtn = page.locator(".checkout .btn");
  }

  async removeItem(itemOrder = 0) {
    await this.removeItemBtn.nth(itemOrder).click();
  }

  async clickOnProceedToCheckoutBtn() {
    await this.proceedToCheckoutBtn.click();
  }
}
