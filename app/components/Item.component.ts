import { Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class Item extends BaseComp {
  readonly preview = {
    itemCard: this.page.locator('[id="main"] article'),
    addToFavoritesBtn: ".wishlist-button-add i",
    activeAddToFavoritesBtn: this.page
      .locator(".wishlist-button-add i")
      .getByText("favorite_border"),
    title: this.page.locator(".product-description a"),
    titleInWishList: this.page.locator(".wishlist-product-title"),
    price: this.page.locator(".price")
  };
  readonly mainPage = {
    title: this.page.locator("h1"),
    addToFavoritesBtn: this.preview.addToFavoritesBtn,
    activeAddToFavoritesBtn: this.preview.activeAddToFavoritesBtn
  };
  readonly inCreatedOrder = {
    title: this.page.locator(".order-line.row")
  };

  readonly addedToWishListSuccessMsg: Locator = this.page.locator(
    ".wishlist-toast.isActive p"
  );

  async clickOnFavoritesBtn(itemOrder: number) {
    await this.preview.itemCard
      .nth(itemOrder)
      .locator(this.preview.addToFavoritesBtn)
      .click();
  }
}
