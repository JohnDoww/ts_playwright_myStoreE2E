import { Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class WishListModal extends BaseComp {
  readonly body: Locator = this.page.locator(
    '.wishlist-modal.show[aria-modal="true"]'
  );
  private listItem: Locator = this.page.locator(".wishlist-chooselist li");

  async selectWishList(listName: string) {
    await this.listItem.getByText(listName).click();
  }
}
