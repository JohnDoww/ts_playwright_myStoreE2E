import { Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class WishList extends BaseComp {
  private list: Locator = this.page.locator(".wishlist-list li");
  private itemsInsideTheList = "span";

  getList(): Locator {
    return this.list;
  }

  async getAmountOfItemsInside(listName: string): Promise<string | null> {
    const itemsAmount = await this.list
      .getByText(listName)
      .locator(this.itemsInsideTheList)
      .textContent();

    return itemsAmount;
  }
}
