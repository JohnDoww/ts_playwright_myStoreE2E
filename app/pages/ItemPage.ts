import { step } from "../../utils/helpers/stepDecorator";
import { AddToCart } from "../components/AddToCart.component";
import { AddedItemModal } from "../components/AddedItemModal.component";
import { BreadCrumbs } from "../components/BreadCrumbs.component";
import { Item } from "../components/Item.component";
import { ItemAmountManager } from "../components/ItemAmountManager.component";
import { BasePage } from "./BasePage.abstract";

export class ItemPage extends BasePage {
  private url: string =
    "?id_product=4&id_product_attribute=16&rewrite=the-adventure-begins-framed-poster&controller=product#";
  private partOfRequestModalAppearing: string = "controller";

  private addToCartComp: AddToCart = new AddToCart(this.page);
  private breadCrumbComp: BreadCrumbs = new BreadCrumbs(this.page);
  private itemDescComp: Item = new Item(this.page);
  private addedItemModalComp: AddedItemModal = new AddedItemModal(this.page);
  private itemAmountManagerComp: ItemAmountManager = new ItemAmountManager(this.page);


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

    await this.addToCartComp.clickBtn();
    await waitForModalAppearing;
    await this.page.waitForLoadState("load");
  }

  @step("Handle confirm modal after item adding")
  async closeConfirmAddingModal() {
    await this.addedItemModalComp.clickCloseBtn();
    const addedItemModalTitle = await this.addedItemModalComp.getTitleLocator();
    await addedItemModalTitle.waitFor({ state: "hidden" });
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
    return this.breadCrumbComp.getLocator();
  }

  @step("Get item title")
  async getTitle() {
    await this.itemDescComp.mainPage.title.waitFor();
    return this.itemDescComp.mainPage.title;
  }
}
