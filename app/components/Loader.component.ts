import { Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class Loader extends BaseComp {
  private body: Locator = this.page.locator(".overlay__content");

  async becomeHidden() {
    if (await this.body.isVisible()) {
      await this.body.waitFor({ state: "detached" });
    }
  }
}
