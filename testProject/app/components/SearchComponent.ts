import { Locator, Page } from "@playwright/test";

export class SearchComponent {
  protected page: Page;
  private inputLocator: Locator;
  proposedItemsLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputLocator = page.locator('[aria-label="Search"]');
    this.proposedItemsLocator = page.locator(".ui-menu-item");
  }

  async fillIn(searchValue: string) {
    await this.inputLocator.waitFor({ state: "visible" });
    await this.inputLocator.fill(searchValue);
  }

  async findItem(item) {
    await this.fillIn(item);
    await this.page.keyboard.press("Enter");
  }
}
