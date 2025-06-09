import { Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class RegistrationForm extends BaseComp {
  private saveUserBtn: Locator = this.page.locator(
    '[data-link-action="save-customer"]'
  );

  async clickSaveNewUserBtn() {
    await this.saveUserBtn.waitFor();
    await this.saveUserBtn.click();
  }
}
