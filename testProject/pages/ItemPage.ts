import { Locator, Page, expect } from "@playwright/test";

export class ItemPage {
  private page: Page;
  bradCrumbLocator: Locator;
  itemTitleLocator: Locator;

  addToCartBtn: Locator;
  modalTitleAfterAddingItemLocator: Locator;
  closeModalBtn: Locator;

  increaseItemAmountLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bradCrumbLocator = page.locator(".breadcrumb");
    this.itemTitleLocator = page.locator("h1");
    this.addToCartBtn = page.locator(".product-quantity .add");
    this.modalTitleAfterAddingItemLocator = page.locator("#myModalLabel");
    this.closeModalBtn = page.locator("#blockcart-modal .close");

    this.increaseItemAmountLocator = page.locator(".bootstrap-touchspin-up");
  }

  async addToCart() {
    await this.addToCartBtn.waitFor();

    const waitForModalResponse = this.page.waitForResponse((response) =>
      response.url().includes("controller")
    );

    await this.addToCartBtn.click();
    await waitForModalResponse;
  }
  async closeAddingConfirmModal() {
    await this.modalTitleAfterAddingItemLocator.waitFor({state:'attached'});
    await this.closeModalBtn.waitFor();
    await this.closeModalBtn.click();
  }
}
