import { Page, Locator } from "@playwright/test";
export class ShippingMethod {
  protected page: Page;
  private submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.submitBtn = page.locator("#js-delivery button");
  }
  async submitInfo() {
    await this.submitBtn.waitFor();
    await this.submitBtn.click();
  }
}
