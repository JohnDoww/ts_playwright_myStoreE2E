import { Page, Locator } from "@playwright/test";

export class ItemDescription {
  protected page: Page;
  onMain: {
    title: Locator;
  };
  onPreview: {
    title: Locator;
  };
  onCreatedOrder: {
    title: Locator;
  };

  constructor(page: Page) {
    this.page = page;

    this.onMain = {
      title: page.locator("h1")
    };
    this.onPreview = {
      title: page.locator(".product-description a")
    };
    this.onCreatedOrder = {
      title: page.locator(".order-line.row")
    };
  }
}
