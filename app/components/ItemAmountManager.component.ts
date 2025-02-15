import { Page, Locator } from "@playwright/test";
import { step } from "../../utils/helpers/stepDecorator";

export class ItemAmountManager {
  protected page: Page;
  private more: Locator;
  private less: Locator;

  constructor(page: Page) {
    this.page = page;
    this.more = page.locator(".bootstrap-touchspin-up");
    this.less = page.locator(".bootstrap-touchspin-down");
  }

  @step("Amount increased")
  async increase() {
    await this.more.waitFor();
    await this.more.click();
  }
  @step("Amount decreased")
  async decrease() {
    await this.less.waitFor();
    await this.less.click();
  }
}
