import { Locator, Page } from "@playwright/test";

export class RegistrationFormComponent {
  protected page: Page;
  private signInLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInLink = page.locator(".user-info .hidden-sm-down");
  }

//   async 
}
