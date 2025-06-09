import { Locator, Page } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class BreadCrumbs extends BaseComp {
  readonly body: Locator = this.page.locator(".breadcrumb");

  constructor(page: Page) {
    super(page);
  }
}
