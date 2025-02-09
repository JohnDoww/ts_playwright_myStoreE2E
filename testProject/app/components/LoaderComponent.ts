import { Locator, Page } from "@playwright/test";

export class LoaderComponent {
  private page: Page;
  private body: Locator;

  constructor(page: Page) {
    this.page = page;
    this.body = page.locator(".overlay__content");
  }

  async becomeHidden() {
    if (await this.body.isVisible()) {
      await this.body.waitFor({ state: "detached" });
    }
  }
}
