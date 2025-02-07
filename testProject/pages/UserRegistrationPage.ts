import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { UserPage } from "./UserPage";

export class UserRegistrationPage {
  protected page: Page;
  saveNewUserBtn: Locator;
  protected basePage: BasePage;
  protected userPage: UserPage;

  constructor(page: Page) {
    this.page = page;
    this.saveNewUserBtn = page.locator('[data-link-action="save-customer"]');
    this.basePage = new BasePage(page);
    this.userPage = new UserPage(page);
  }

  async openNewUserRegistrationPage() {
    await this.basePage.signInLink.waitFor();
    await this.basePage.signInLink.click();

    await this.userPage.createNewUserLink.waitFor();
    await this.userPage.createNewUserLink.click();

    await this.page.waitForLoadState();
  }

  async submitRegistrationForm() {
    await this.saveNewUserBtn.waitFor();

    const waitForModalResponse1 = this.page.waitForResponse((response) =>
      response.url().includes("controller=action")
    );
    await this.saveNewUserBtn.click();
    await waitForModalResponse1;
  }
}
