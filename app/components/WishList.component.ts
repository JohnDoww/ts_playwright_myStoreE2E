import { Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class WishList extends BaseComp {
  private toOpen: Locator = this.page.locator(".wishlist-list li");
  private itemsInside = "span";

  getList(): Locator {
    return this.toOpen;
  }

  async getAmountOfItemsInside(listName: string): Promise<string | null> {
    const itemsAmount = await this.toOpen
      .getByText(listName)
      .locator(this.itemsInside)
      .textContent();

    return itemsAmount;
  }
}
