import { Locator, Page } from "@playwright/test";

export class UserIndicatorComponent {
  protected page: Page;
  private signInLink: Locator;
  profileLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInLink = page.locator(".user-info .hidden-sm-down");
    this.profileLink = page.locator("#_desktop_user_info");
  }

  async clickSignIn() {
    await this.signInLink.waitFor();
    await this.signInLink.click();
  }
}
