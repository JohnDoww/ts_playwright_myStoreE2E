import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ItemPage extends BasePage {
  private partOfRequestModalAppearing: string = "controller";

  constructor(page: Page) {
    super(page);
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
  async closeConfirmAddingModal() {
    await this.modalAfterItemAddComp.clickOnClose();
    await this.modalAfterItemAddComp.title.waitFor({ state: "hidden" });
  }

  async changeAmountOfNeededItem(action: "+" | "-") {
    if (action === "+") {
      return await this.itemAmountManagerComp.increase();
    } else {
      return await this.itemAmountManagerComp.decrease();
    }
  }
}
