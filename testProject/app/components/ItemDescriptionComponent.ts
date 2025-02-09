import { Page, Locator } from "@playwright/test";

export class ItemDescriptionComponent {
  protected page: Page;
  main: {
    title: Locator;
  };
  preview: {
    title: Locator;
  };

  constructor(page: Page) {
    this.page = page;

    this.main = {
      title: page.locator("h1"),
    };
    this.preview = {
      title: page.locator("                    "),
    };
  }
}
