import { Locator, Page } from "@playwright/test";

export class UserIndicatorComponent {
  protected page: Page;
  private signInLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInLink = page.locator(".user-info .hidden-sm-down");
  }

  async clickSignIn(){
    await this.signInLink.waitFor();
    await this.signInLink.click();
  }
}
