import { Page, Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";
export class ShippingMethod extends BaseComp {
  private submitBtn: Locator = this.page.locator("#js-delivery button");

  constructor(page: Page) {
    super(page);
  }

  async submitInfo() {
    await this.submitBtn.waitFor();
    await this.submitBtn.click();
  }
}
