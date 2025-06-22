import { Locator } from "@playwright/test";
import { step } from "../../utils/helpers/stepDecorator";
import { Search } from "../components/Search.component";
import { CartDisplay } from "../components/CartDisplay.component";
import { UserIndicator } from "../components/UserIndicator.component";
import { Item } from "../components/Item.component";
import { BasePage } from "./BasePage.abstract";
import { WishListModal } from "../components/WishListModal.component";
export class HomePage extends BasePage {
  private search: Search = new Search(this.page);
  private cartDisplay: CartDisplay = new CartDisplay(this.page);
  private userIndicator: UserIndicator = new UserIndicator(this.page);
  private itemComp: Item = new Item(this.page);
  private wishListModalComp: WishListModal = new WishListModal(this.page);

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
    await this.cartDisplay.clickBtn();
  }

  async getCartCounter() {
    const counterLocator = await this.cartDisplay.getCounterLocator();
    return counterLocator;
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
    await this.itemComp.clickAddToFavoritesBtn("preview", itemToAdd);
    await this.wishListModalComp.selectWishList(wishList);
  }

  getSuccessfullyAddedToWishlistMsg(): Locator {
    return this.itemComp.getAddedToWishListSuccessMsg();
  }
  getWishlistModal(): Locator {
    return this.wishListModalComp.body;
  }
}
