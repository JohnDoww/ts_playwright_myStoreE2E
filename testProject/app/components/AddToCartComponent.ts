import { Locator, Page } from "@playwright/test";

export class AddToCartComponent {
  protected page: Page;
  private body: Locator;

  constructor(page: Page) {
    this.body = page.locator(".product-add-to-cart .add");
  }

  async clickOn() {
    await this.body.waitFor();
    await this.body.click();
  }
}
