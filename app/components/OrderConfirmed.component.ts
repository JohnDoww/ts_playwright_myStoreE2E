import { Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class OrderConfirmed extends BaseComp {
  private title: Locator = this.page.locator(".h1.card-title");

  async getTitleLocator() {
    await this.title.waitFor();
    return this.title;
  }
}
