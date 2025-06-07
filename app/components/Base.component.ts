import { Page } from "@playwright/test";

export class BaseComp {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
