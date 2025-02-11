import { Page } from "@playwright/test";
import { step } from "../../utils/helpers/stepDecorator";
import { FunctionHelpers } from "../../utils/helpers/FunctionHelpers";
import { ComponentsHolder } from "../ComponentsHolder";
export class BasePage {
  protected page: Page;
  private compHold: ComponentsHolder;
  private helper: FunctionHelpers;

  constructor(page: Page) {
    this.page = page;
    this.helper = new FunctionHelpers(page);
    this.compHold = new ComponentsHolder(page);
  }
  @step("open Home Page")
  async goTo(url: string = "/") {
    await this.page.goto(url);
  }
  @step("Fill search")
  async fillInSearch(searchValue: string) {
    await this.compHold.search.fillIn(searchValue);
  }
  @step("Search item")
  async searchForItem(searchValue: string) {
    await this.compHold.search.findItem(searchValue);
  }
  @step("Handle the loader")
  async loaderHandler() {
    await this.compHold.loader.becomeHidden();
  }

  @step("Open cart page")
  async goToCart() {
    await this.compHold.cartDisplay.clickOnBtn();
  }

  getCartCounter() {
    return this.compHold.cartDisplay.counter;
  }

  @step("Open login page")
  async clickSignInLink() {
    await this.compHold.userIndicator.clickSignIn();
  }

  @step("Get proposed items in search")
  async returnProposedItemsInSearch() {
    return await this.helper.returnAllLocators(
      this.compHold.search.proposedItems
    );
  }
}
