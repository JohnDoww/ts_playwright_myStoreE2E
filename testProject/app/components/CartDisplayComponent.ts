import { Locator, Page } from "@playwright/test";

export class CartDisplayComponent {
  protected page: Page;
  private btn: Locator;
  counter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btn = page.locator("#_desktop_cart");
    this.counter = page.locator(".header .cart-products-count");
  }

  async clickOnBtn() {
    await this.btn.waitFor();
    await this.btn.click();
    await this.page.waitForLoadState();
  }
}
