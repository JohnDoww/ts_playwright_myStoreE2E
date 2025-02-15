import { Locator, Page } from "@playwright/test";

export class LoginForm {
  protected page: Page;
  private createNewUserLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createNewUserLink = page.locator(".no-account a");
  }

  async clickOnNoAccount() {
    await this.createNewUserLink.waitFor();
    await this.createNewUserLink.click();
  }
}
