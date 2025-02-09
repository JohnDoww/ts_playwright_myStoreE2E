import { BasePage } from "./BasePage";

export class UserRegistrationPage extends BasePage {
  private partOfRequestAfterFormSubmit: string = "controller=action";

  async openNewUserRegistrationPage() {
    await super.clickSignInLink();

    await this.logFormComp.clickOnNoAccount();

    await this.page.waitForLoadState();
  }

  async submitRegistrationForm() {
    const waitForModalResponse1 = super.responseWaiter(
      this.partOfRequestAfterFormSubmit
    );
    await this.regFormComp.clickSaveNewUserBtn();
    await waitForModalResponse1;
  }
}
