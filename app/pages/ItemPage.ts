import { Page } from "@playwright/test";
import { step } from "../../utils/helpers/stepDecorator";
import { AddToCart } from "../components/AddToCart.component";
import { AddedItemModal } from "../components/AddedItemModal.component";
import { BreadCrumbs } from "../components/BreadCrumbs.component";
import { ItemDescription } from "../components/ItemDescription.component";
import { ItemAmountManager } from "../components/ItemAmountManager.component";
import { FunctionHelpers } from "../../utils/helpers/FunctionHelpers";

export class ItemPage {
  private page: Page;
  private addToCartComp: AddToCart;
  private breadCrumbComp: BreadCrumbs;
  private itemDescComp: ItemDescription;
  private addedItemModalComp: AddedItemModal;
  private itemAmountManagerComp: ItemAmountManager;
  private helper: FunctionHelpers;
  private partOfRequestModalAppearing: string = "controller";

  constructor(page: Page) {
    this.page = page;
    this.addedItemModalComp = new AddedItemModal(page);
    this.itemDescComp = new ItemDescription(page);
    this.breadCrumbComp = new BreadCrumbs(page);
    this.itemAmountManagerComp = new ItemAmountManager(page);
    this.addToCartComp = new AddToCart(page);
    this.helper = new FunctionHelpers(page);
  }

  @step("Add item to cart")
  async addToCart() {
    await this.page.waitForLoadState("load");
    const waitForModalAppearing = this.helper.responseWaiter(
      this.partOfRequestModalAppearing
    );

    await this.addToCartComp.clickOn();
    await waitForModalAppearing;
    await this.page.waitForLoadState("load");
  }

  @step("Handle confirm modal after item adding")
  async closeConfirmAddingModal() {
    await this.addedItemModalComp.clickOnClose();
    await this.addedItemModalComp.title.waitFor({ state: "hidden" });
  }

  @step("Change amount of needed item")
  async changeAmountOfNeededItem(action: "+" | "-") {
    if (action === "+") {
      return await this.itemAmountManagerComp.increase();
    } else {
      return await this.itemAmountManagerComp.decrease();
    }
  }

  @step("Get breadcrumb")
  async getBreadcrumb() {
    await this.breadCrumbComp.body.waitFor();
    return this.breadCrumbComp.body;
  }

  @step("Get item title")
  async getTitle() {
    await this.itemDescComp.onMain.title.waitFor();
    return this.itemDescComp.onMain.title;
  }
}
