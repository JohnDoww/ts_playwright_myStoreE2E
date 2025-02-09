import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ItemPage extends BasePage {
  private partOfRequestModalAppearing: string = "controller";
  bradCrumbLocator: Locator;
  itemTitleLocator: Locator;

  addToCartBtn: Locator;
  modalTitleAfterAddingItemLocator: Locator;
  closeModalBtn: Locator;

  increaseItemAmountLocator: Locator;
  decreaseItemAmountLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.bradCrumbLocator = page.locator(".breadcrumb");
    this.itemTitleLocator = page.locator("h1");
    this.addToCartBtn = page.locator(".product-add-to-cart .add");

    this.modalTitleAfterAddingItemLocator = this.page.locator(
      "#blockcart-modal.in"
    );
    this.closeModalBtn = page.locator("#blockcart-modal .close");

    this.increaseItemAmountLocator = page.locator(".bootstrap-touchspin-up");
    this.decreaseItemAmountLocator = page.locator(".bootstrap-touchspin-down");
  }

  async addToCart() {
    await this.page.waitForLoadState("load");
    await this.addToCartBtn.waitFor();

    const waitForModalAppearing = super.responseWaiter(
      this.partOfRequestModalAppearing
    );

    await this.addToCartBtn.click();
    await waitForModalAppearing;
    await this.page.waitForLoadState("load");
  }
  async closeAddingConfirmModal() {
    await this.closeModalBtn.waitFor({ state: "visible" });
    await this.closeModalBtn.click();

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
}
