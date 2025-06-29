import { Locator } from "@playwright/test";
import { step } from "../../utils/helpers/stepDecorator";
import { BaseComp } from "./Base.component";

export class ItemAmountManager extends BaseComp {
  private more: Locator = this.page.locator(".bootstrap-touchspin-up");
  private less: Locator = this.page.locator(".bootstrap-touchspin-down");

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
