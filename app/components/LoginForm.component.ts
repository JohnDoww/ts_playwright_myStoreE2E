import { Locator, Page } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class LoginForm extends BaseComp {
  private createNewUserLink: Locator = this.page.locator(".no-account a");

  constructor(page: Page) {
    super(page);
  }

  async clickOnNoAccount() {
    await this.createNewUserLink.waitFor();
    await this.createNewUserLink.click();
  }
}
