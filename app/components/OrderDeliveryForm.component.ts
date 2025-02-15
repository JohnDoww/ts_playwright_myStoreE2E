import { Page, Locator } from "@playwright/test";

export class OrderDeliveryForm {
  protected page: Page;
  private submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.submitBtn = page.locator("#delivery-address .continue.btn");
  }
  async submitInfo() {
    await this.submitBtn.waitFor();
    await this.submitBtn.click();
  }
}
