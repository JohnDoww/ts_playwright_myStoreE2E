import { Page, Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class OrderConfirmed extends BaseComp {
  readonly title: Locator = this.page.locator(".h1.card-title");

  constructor(page: Page) {
    super(page);
  }
}
