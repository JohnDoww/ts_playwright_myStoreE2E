import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ItemPage extends BasePage {
  private partOfRequestModalAppearing: string = "controller";
  bradCrumbLocator: Locator;
  itemTitleLocator: Locator;

  modalTitleAfterAddingItemLocator: Locator;
  closeModalBtn: Locator;

  increaseItemAmountLocator: Locator;
  decreaseItemAmountLocator: Locator;

  constructor(page: Page) {
    super(page);
    // this.bradCrumbLocator = page.locator(".breadcrumb");
    // this.itemTitleLocator = page.locator("h1");

    // this.modalTitleAfterAddingItemLocator = this.page.locator(
    //   "#blockcart-modal.in"
    // );
    // this.closeModalBtn = page.locator("#blockcart-modal .close");

    this.increaseItemAmountLocator = page.locator(".bootstrap-touchspin-up");
    this.decreaseItemAmountLocator = page.locator(".bootstrap-touchspin-down");
  }

  async addToCart() {
    await this.page.waitForLoadState("load");

    const waitForModalAppearing = super.responseWaiter(
      this.partOfRequestModalAppearing
    );

    await this.addToCartComp.clickOn();
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
