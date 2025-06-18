import { Locator} from "@playwright/test";
import { BaseComp } from "./Base.component";

export class LoginForm extends BaseComp {
  private createNewUserLink: Locator = this.page.locator(".no-account a");

  async clickOnNoAccount() {
    await this.createNewUserLink.waitFor();
    await this.createNewUserLink.click();
  }
}
