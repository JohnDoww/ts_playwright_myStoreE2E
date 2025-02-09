import { Locator, Page } from "@playwright/test";

export class CartDisplayComponent {
  protected page: Page;
  private btnLocator: Locator;
  counterLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnLocator = page.locator("#_desktop_cart");
    this.counterLocator = page.locator(".header .cart-products-count");
  }

  async clickOnBtn() {
    await this.btnLocator.waitFor();
    await this.btnLocator.click();
    await this.page.waitForLoadState();
  }
}
