import { Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class AddedItemModal extends BaseComp {
  readonly title: Locator = this.page.locator("#blockcart-modal.in");
  private closeBtn: Locator = this.page.locator("#blockcart-modal .close");

  async clickCloseBtn() {
    await this.closeBtn.waitFor({ state: "visible" });
    await this.closeBtn.click();
  }

  async getTitleLocator() {
    await this.title.waitFor();
    return this.title;
  }
}
