import { Locator, Page } from "@playwright/test";
import { step } from "../../utils/helpers/stepDecorator";
import { Search } from "../components/Search.component";
import { CartDisplay } from "../components/CartDisplay.component";
import { UserIndicator } from "../components/UserIndicator.component";
import { Item } from "../components/Item.component";
import { BasePage } from "./BasePage.abstract";
import { WishListModal } from "../components/WishListModal.component";
export class HomePage extends BasePage {
  private search: Search;
  private cartDisplay: CartDisplay;
  private userIndicator: UserIndicator;
  private itemComp: Item;
  private wishListModalComp: WishListModal;

  constructor(page: Page) {
    super(page);
    this.search = new Search(page);
    this.cartDisplay = new CartDisplay(page);
    this.userIndicator = new UserIndicator(page);
    this.itemComp = new Item(page);
    this.wishListModalComp = new WishListModal(page);
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

  @step("Add item to favorites")
  async addItemToWishlist(
    itemToAdd: number = 0,
    wishList: string = "My wishlist"
  ) {
    await this.itemComp.clickOnFavoritesBtn(itemToAdd);
    await this.wishListModalComp.selectWishList(wishList);
  }

  getSuccessfullyAddedToWishlistMsg(): Locator {
    return this.itemComp.addedToWishListSuccessMsg;
  }
  getWishlistModal(): Locator {
    return this.wishListModalComp.body;
  }
}
