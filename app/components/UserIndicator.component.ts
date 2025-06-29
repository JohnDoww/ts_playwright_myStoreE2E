import { Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class UserIndicator extends BaseComp {
  private signInLink: Locator = this.page.locator(".user-info .hidden-sm-down");
  readonly profileLink: Locator = this.page.locator("#_desktop_user_info .account");

  async clickSignIn() {
    await this.signInLink.waitFor();
    await this.signInLink.click();
  }
}
