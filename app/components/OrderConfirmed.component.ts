import { Page, Locator } from "@playwright/test";

export class OrderConfirmed {
  protected page: Page;
  title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator(".h1.card-title");
  }
}
