import { Page, Locator } from "@playwright/test";

export class AddedItemModalComponent {
  protected page: Page;
  private closeBtn: Locator;
  title: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.locator("#blockcart-modal.in");
    this.closeBtn = page.locator("#blockcart-modal .close");
  }
  
  async clickOnClose(){
    await this.closeBtn.waitFor({state:"visible"});
    await this.closeBtn.click();
  }
}
