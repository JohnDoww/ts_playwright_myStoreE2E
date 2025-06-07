import { Locator, Page } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class AddToCart extends BaseComp {
  private body: Locator = this.page.locator(".product-add-to-cart .add");

  constructor(page: Page) {
    super(page);
  }

  async clickOn() {
    await this.body.waitFor();
    await this.body.click();
  }
}
