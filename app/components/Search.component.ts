import { Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class Search extends BaseComp {
  private input: Locator = this.page.locator('[aria-label="Search"]');
  readonly proposedItems: Locator = this.page.locator(".ui-menu-item");

  async fillIn(searchValue: string) {
    await this.input.waitFor({ state: "visible" });
    await this.input.fill(searchValue);
  }

  async findItem(item) {
    await this.fillIn(item);
    await this.page.keyboard.press("Enter");
  }
}
