import { Page } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class Item extends BaseComp {
  readonly mainPage = {
    title: this.page.locator("h1")
  };
  readonly preview = {
    title: this.page.locator(".product-description a")
  };
  readonly inCreatedOrder = {
    title: this.page.locator(".order-line.row")
  };

  constructor(page: Page) {
    super(page);
  }
}
