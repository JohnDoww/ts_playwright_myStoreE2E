import { Locator, Page } from "@playwright/test";

export class SearchComponent {
  protected page: Page;
  private input: Locator;
  proposedItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = page.locator('[aria-label="Search"]');
    this.proposedItems = page.locator(".ui-menu-item");
  }

  async fillIn(searchValue: string) {
    await this.input.waitFor({ state: "visible" });
    await this.input.fill(searchValue);
  }

  async findItem(item) {
    await this.fillIn(item);
    await this.page.keyboard.press("Enter");
  }
}
