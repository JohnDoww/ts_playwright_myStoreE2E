import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class UserRegistrationPage extends BasePage {
  saveNewUserBtn: Locator;
  private partOfRequestAfterFormSubmit: string = "controller=action";

  // constructor(page: Page) {
  //   super(page);
  //   // this.saveNewUserBtn = page.locator('[data-link-action="save-customer"]');
  // }

  async openNewUserRegistrationPage() {
    await super.clickSignInLink();

    // await this.userPage.createNewUserLink.waitFor();
    // await this.userPage.createNewUserLink.click();
    await this.logFormComp.clickOnNoAccount();

    await this.page.waitForLoadState();
  }

  async submitRegistrationForm() {
    await this.saveNewUserBtn.waitFor();

    const waitForModalResponse1 = super.responseWaiter(
      this.partOfRequestAfterFormSubmit
    );

    // await this.saveNewUserBtn.click();
    await this.regFormComp.clickSaveNewUserBtn();
    await waitForModalResponse1;
  }
}
