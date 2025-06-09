import { Locator, Page } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class CartDisplay extends BaseComp {
  private btn: Locator = this.page.locator("#_desktop_cart");
  readonly counter: Locator = this.page.locator(".header .cart-products-count");

  constructor(page: Page) {
    super(page);
  }

  async clickOnBtn() {
    await this.btn.waitFor();
    await this.btn.click();
    await this.page.waitForLoadState();
  }
}
