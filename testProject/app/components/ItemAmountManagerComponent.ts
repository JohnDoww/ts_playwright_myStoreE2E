import { Page, Locator } from "@playwright/test";

export class ItemAmountManagerComponent {
  protected page: Page;
  private more: Locator;
  private less: Locator;

  constructor(page: Page) {
    this.page = page;
    this.more = page.locator(".bootstrap-touchspin-up");
    this.less = page.locator(".bootstrap-touchspin-down");
  }

  async increase() {
    await this.more.waitFor();
    await this.more.click();
  }

  async decrease() {
    await this.less.waitFor();
    await this.less.click();
  }
}
