import { Locator, Page } from "@playwright/test";

export class BreadCrumbs {
  protected page: Page;
  body: Locator;

  constructor(page: Page) {
    this.page = page;
    this.body = page.locator(".breadcrumb");
  }
}
