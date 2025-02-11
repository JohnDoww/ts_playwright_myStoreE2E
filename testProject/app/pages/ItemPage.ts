import { Page } from "@playwright/test";
import { step } from "../../utils/helpers/stepDecorator";
import { ComponentsHolder } from "../ComponentsHolder";
import { FunctionHelpers } from "../../utils/helpers/FunctionHelpers";

export class ItemPage {
  protected page: Page;
  private compHold: ComponentsHolder;
  private helper: FunctionHelpers;
  private partOfRequestModalAppearing: string = "controller";

  constructor(page: Page) {
    this.page = page;
    this.compHold = new ComponentsHolder(page);
    this.helper = new FunctionHelpers(page);
  }

  @step("Add item to cart")
  async addToCart() {
    await this.page.waitForLoadState("load");
    const waitForModalAppearing = this.helper.responseWaiter(
      this.partOfRequestModalAppearing
    );

    await this.compHold.addToCart.clickOn();
    await waitForModalAppearing;
    await this.page.waitForLoadState("load");
  }

  @step("Handle confirm modal after item adding")
  async closeConfirmAddingModal() {
    await this.compHold.modalAfterItemAdd.clickOnClose();
    await this.compHold.modalAfterItemAdd.title.waitFor({ state: "hidden" });
  }

  @step("Change amount of needed item")
  async changeAmountOfNeededItem(action: "+" | "-") {
    if (action === "+") {
      return await this.compHold.itemAmountManager.increase();
    } else {
      return await this.compHold.itemAmountManager.decrease();
    }
  }

  @step("Get breadcrumb")
  async getBreadcrumb() {
    await this.compHold.breadcrumb.body.waitFor();
    return this.compHold.breadcrumb.body;
  }

  @step("Get item title")
  async getTitle() {
    await this.compHold.itemDesc.onMain.title.waitFor();
    return this.compHold.itemDesc.onMain.title;
  }
}
