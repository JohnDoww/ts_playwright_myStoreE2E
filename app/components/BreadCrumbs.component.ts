import { Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class BreadCrumbs extends BaseComp {
  private body: Locator = this.page.locator(".breadcrumb");

  async getLocator(){
    await this.body.waitFor();
    return this.body;
  }

}
