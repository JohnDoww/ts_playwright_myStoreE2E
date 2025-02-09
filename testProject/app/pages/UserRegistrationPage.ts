import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { UserPage } from "./UserPage";

export class UserRegistrationPage extends BasePage {
  protected userPage: UserPage;
  saveNewUserBtn: Locator;
  private partOfRequestAfterFormSubmit: string = "controller=action";

  constructor(page: Page) {
    super(page);
    this.userPage = new UserPage(page);
    this.saveNewUserBtn = page.locator('[data-link-action="save-customer"]');
  }

  async openNewUserRegistrationPage() {
    await super.clickSignInLink();

    await this.userPage.createNewUserLink.waitFor();
    await this.userPage.createNewUserLink.click();

    await this.page.waitForLoadState();
  }

  async submitRegistrationForm() {
    await this.saveNewUserBtn.waitFor();

    const waitForModalResponse1 = super.responseWaiter(
      this.partOfRequestAfterFormSubmit
    );

    await this.saveNewUserBtn.click();
    await waitForModalResponse1;
  }
}
