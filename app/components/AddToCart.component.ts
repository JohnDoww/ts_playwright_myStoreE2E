import { Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class AddToCart extends BaseComp {
  private body: Locator = this.page.locator(".product-add-to-cart .add");

  async clickOnBtn() {
    await this.body.waitFor();
    await this.body.click();
  }
}
