import { Page } from "@playwright/test";
import { step } from "../../utils/helpers/stepDecorator";
import { AddToCart } from "../components/AddToCart.component";
import { AddedItemModal } from "../components/AddedItemModal.component";
import { BreadCrumbs } from "../components/BreadCrumbs.component";
import { ItemDescription } from "../components/ItemDescription.component";
import { ItemAmountManager } from "../components/ItemAmountManager.component";
import { BasePage } from "./BasePage.abstract";

export class ItemPage extends BasePage {
  private addToCartComp: AddToCart;
  private breadCrumbComp: BreadCrumbs;
  private itemDescComp: ItemDescription;
  private addedItemModalComp: AddedItemModal;
  private itemAmountManagerComp: ItemAmountManager;
  private partOfRequestModalAppearing: string = "controller";
  private url: string =
    "?id_product=4&id_product_attribute=16&rewrite=the-adventure-begins-framed-poster&controller=product#";

  constructor(page: Page) {
    super(page);
    this.addedItemModalComp = new AddedItemModal(page);
    this.itemDescComp = new ItemDescription(page);
    this.breadCrumbComp = new BreadCrumbs(page);
    this.itemAmountManagerComp = new ItemAmountManager(page);
    this.addToCartComp = new AddToCart(page);
  }

  @step("Open item page")
  async goTo() {
    await this.page.goto(this.url);
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
