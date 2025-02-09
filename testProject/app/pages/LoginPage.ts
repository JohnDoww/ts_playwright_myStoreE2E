import { Locator, Page } from "@playwright/test";
import { LoginFormComponent } from "../components/LoginFormComponent";
export class LoginPage {
  protected page: Page;
  protected loginFormComp: LoginFormComponent;
  userProfileLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginFormComp = new LoginFormComponent(page);

    this.userProfileLink = page.locator("#_desktop_user_info");
    // this.createNewUserLink = page.locator(".no-account a");
  }

  async followToRegForm() {
    await this.loginFormComp.clickOnNoAccount();
  }
}
