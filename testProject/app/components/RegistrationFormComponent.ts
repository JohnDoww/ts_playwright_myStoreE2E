import { Locator, Page } from "@playwright/test";

export class RegistrationFormComponent {
  protected page: Page;
  private saveUserBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.saveUserBtn = page.locator('[data-link-action="save-customer"]');
  }

  async clickSaveNewUserBtn() {
    await this.saveUserBtn.waitFor();
    await this.saveUserBtn.click();
  }
}
