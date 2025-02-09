import { Page, Locator } from "@playwright/test";
export class ShippingMethodComponent {
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
