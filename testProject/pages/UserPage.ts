import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class UserPage {
  protected page: Page;
  userProfileLink: Locator;
  createNewUserLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userProfileLink = page.locator("#_desktop_user_info");
    this.createNewUserLink = page.locator(".no-account a");
  }
}
