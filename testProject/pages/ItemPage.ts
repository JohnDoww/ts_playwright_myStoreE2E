import { Locator, Page, expect } from "@playwright/test";

export class ItemPage {
  private page: Page;
  bradCrumbLocator: Locator;
  itemTitleLocator: Locator;

  addToCartBtn: Locator;
  modalTitleAfterAddingItemLocator: Locator;
  closeModalBtn: Locator;

  increaseItemAmountLocator: Locator;
  decreaseItemAmountLocator: Locator;
  neededItemsAmountInputLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bradCrumbLocator = page.locator(".breadcrumb");
    this.itemTitleLocator = page.locator("h1");
    this.addToCartBtn = page.locator(".product-add-to-cart .add");

    this.modalTitleAfterAddingItemLocator = this.page.locator(
      "#blockcart-modal.in"
    );
    this.closeModalBtn = page.locator("#blockcart-modal .close");

    this.increaseItemAmountLocator = page.locator(".bootstrap-touchspin-up");
    this.decreaseItemAmountLocator = page.locator(".bootstrap-touchspin-down");
    this.neededItemsAmountInputLocator = page.locator("#quantity_wanted");
  }

  async addToCart() {
    await this.page.waitForLoadState("load");
    await this.addToCartBtn.waitFor();

    const waitForModalResponse = this.page.waitForResponse((response) =>
      response.url().includes("controller")
    );

    await this.addToCartBtn.click();
    await waitForModalResponse;
    await this.page.waitForLoadState("load");
  }
  async closeAddingConfirmModal() {
    await this.closeModalBtn.waitFor();
    await this.closeModalBtn.click();


    // if (await this.closeModalBtn.isVisible()) {
    //   await this.closeModalBtn.click();
    // } else {
    //   await this.modalTitleAfterAddingItemLocator.waitFor();
    //   await this.closeModalBtn.click();
    // }

    await this.modalTitleAfterAddingItemLocator.waitFor({ state: "hidden" });
  }

  async changeAmountOfNeededItem(action: "+" | "-") {
    let selectedAction = this.increaseItemAmountLocator;
    if (action === "-") {
      selectedAction = this.decreaseItemAmountLocator;
    }
    await selectedAction.waitFor();
    await selectedAction.click();
  }

  async addNeededAmountOfItemsByInput(neededAmount: number) {
    const waitForModalResponse = this.page.waitForResponse((response) =>
      response.url().includes("controller")
    );
    await this.neededItemsAmountInputLocator.fill(`${neededAmount}`);
    await this.neededItemsAmountInputLocator.press("Enter");
    await waitForModalResponse;
    await this.page.waitForLoadState("load");
  }
}
