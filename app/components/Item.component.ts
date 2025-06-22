import { Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class Item extends BaseComp {
  private preview = {
    itemCard: this.page.locator('[id="main"] article'),
    addToFavoritesBtn: ".wishlist-button-add i",
    title: this.page.locator(".product-description a"),
    price: this.page.locator(".price")
  };
  private mainPage = {
    title: this.page.locator("h1"),
    addToFavoritesBtn: this.page.locator(this.preview.addToFavoritesBtn)
  };
  private inCreatedOrder = {
    title: this.page.locator(".order-line.row")
  };
  private inWishList = {
    title: this.page.locator(".wishlist-product-title")
  };

  private addedToWishListSuccessMsg: Locator = this.page.locator(
    ".wishlist-toast.isActive p"
  );

  async clickAddToFavoritesBtn(
    place: "mainPage" | "preview",
    itemOrder: number = 0
  ) {
    switch (place) {
    case "preview":
      await this.preview.itemCard
        .nth(itemOrder)
        .locator(this.preview.addToFavoritesBtn)
        .click();
      break;
    case "mainPage":
      await this.mainPage.addToFavoritesBtn.click();
      break;
    }
  }

  getTitleLocator(
    place: "preview" | "mainPage" | "inCreatedOrder" | "inWishList"
  ) {
    const itemTitleLocator = this[place].title;
    return itemTitleLocator;
  }

  getAddedToWishListSuccessMsg() {
    return this.addedToWishListSuccessMsg;
  }
}
