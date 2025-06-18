import { Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class CartDisplay extends BaseComp {
  private btn: Locator = this.page.locator("#_desktop_cart");
  private counter: Locator = this.page.locator(".header .cart-products-count");

  async clickBtn() {
    await this.btn.waitFor();
    await this.btn.click();
    await this.page.waitForLoadState();
  }

  async getCounterLocator() {
    await this.counter.waitFor();
    return this.counter;
  }
}
