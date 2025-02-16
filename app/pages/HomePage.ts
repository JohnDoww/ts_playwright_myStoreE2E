import { Page } from "@playwright/test";
import { step } from "../../utils/helpers/stepDecorator";
import { FunctionHelpers } from "../../utils/helpers/FunctionHelpers";
import { Search } from "../components/Search.component";
import { Loader } from "../components/Loader.component";
import { CartDisplay } from "../components/CartDisplay.component";
import { UserIndicator } from "../components/UserIndicator.component";
export class HomePage {
  private page: Page;
  private search: Search;
  private loader: Loader;
  private cartDisplay: CartDisplay;
  private userIndicator: UserIndicator;
  private helper: FunctionHelpers;

  constructor(page: Page) {
    this.page = page;
    this.search = new Search(page);
    this.loader = new Loader(page);
    this.cartDisplay = new CartDisplay(page);
    this.userIndicator = new UserIndicator(page);
    this.helper = new FunctionHelpers(page);
  }
  @step("Open home page")
  async goTo(url: string = "/") {
    await this.page.goto(url);
  }
  @step("Fill search")
  async fillInSearch(searchValue: string) {
    await this.search.fillIn(searchValue);
  }
  @step("Search item")
  async searchForItem(searchValue: string) {
    await this.search.findItem(searchValue);
  }
  @step("Handle the loader")
  async loaderHandler() {
    await this.loader.becomeHidden();
  }

  @step("Open cart page")
  async goToCart() {
    await this.cartDisplay.clickOnBtn();
  }

  getCartCounter() {
    return this.cartDisplay.counter;
  }

  @step("Open login page")
  async clickSignInLink() {
    await this.userIndicator.clickSignIn();
  }

  @step("Get proposed items in search")
  async returnProposedItemsInSearch() {
    return await this.helper.returnAllLocators(this.search.proposedItems);
  }
}
