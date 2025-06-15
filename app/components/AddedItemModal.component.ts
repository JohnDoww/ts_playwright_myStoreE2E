import { Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class AddedItemModal extends BaseComp {
  private title: Locator = this.page.locator("#blockcart-modal.in");
  private closeBtn: Locator = this.page.locator("#blockcart-modal .close");

  async clickOnCloseBtn() {
    await this.closeBtn.waitFor({ state: "visible" });
    await this.closeBtn.click();
  }
}
