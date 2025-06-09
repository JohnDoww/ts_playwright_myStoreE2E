import { Locator, Page } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class RegistrationForm extends BaseComp {
  private saveUserBtn: Locator = this.page.locator(
    '[data-link-action="save-customer"]'
  );

  constructor(page: Page) {
    super(page);
  }

  async clickSaveNewUserBtn() {
    await this.saveUserBtn.waitFor();
    await this.saveUserBtn.click();
  }
}
