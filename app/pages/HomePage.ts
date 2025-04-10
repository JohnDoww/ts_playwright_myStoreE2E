import { Page } from "@playwright/test";
import { step } from "../../utils/helpers/stepDecorator";
import { Search } from "../components/Search.component";
import { CartDisplay } from "../components/CartDisplay.component";
import { UserIndicator } from "../components/UserIndicator.component";
import { BasePage } from "./BasePage.abstract";
export class HomePage extends BasePage {
  private search: Search;
  private cartDisplay: CartDisplay;
  private userIndicator: UserIndicator;

  constructor(page: Page) {
    super(page);
    this.search = new Search(page);
    this.cartDisplay = new CartDisplay(page);
    this.userIndicator = new UserIndicator(page);
  }

  @step("Open home page")
  async goTo() {
    await this.page.goto("/");
  }

  @step("Fill search")
  async fillInSearch(searchValue: string) {
    await this.search.fillIn(searchValue);
  }

  @step("Search item")
  async searchForItem(searchValue: string) {
    await this.search.findItem(searchValue);
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
