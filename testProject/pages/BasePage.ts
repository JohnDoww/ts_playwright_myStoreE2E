import { Locator, Page } from "@playwright/test";

export class BasePage {
  page: Page;
  searchInputLocator: Locator;
  loaderLocator: Locator;

  proposedItemsInSearchLocator: Locator;
  searchLocator: Locator;

  cartBtn: Locator;
  // inCartCounterLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInputLocator = page.locator('[aria-label="Search"]');
    this.loaderLocator = page.locator(".overlay__content");
    this.proposedItemsInSearchLocator = page.locator(".ui-menu-item");
    this.searchLocator = page.locator('[aria-label="Search"]');
    this.cartBtn = page.locator("#_desktop_cart");

    // this.inCartCounterLocator = page.locator();
  }

  async goTo(url: string = "/") {
    await this.page.goto(url);
  }

  async fillInSearch(searchRequest: string) {
    await this.searchInputLocator.waitFor({ state: "visible" });
    await this.searchInputLocator.fill(searchRequest);
  }

  async searchForItem(searchRequest: string) {
    await this.fillInSearch(searchRequest);
    await this.page.keyboard.press("Enter");
  }

  async loaderHandler() {
    await this.loaderLocator.isVisible(); // added
    if (await this.loaderLocator.isVisible()) {
      await this.loaderLocator.waitFor({ state: "hidden" });
    }
  }

  async returnInnerText(locator) {
    await locator.waitFor();
    return await locator.innerText();
  }

  async returnAllLocators(locator) {
    await locator.last().waitFor();

    const allSectionLocators = await locator.all();

    return allSectionLocators;
  }

  async goToCart(){
    await this.cartBtn.waitFor();
    await this.cartBtn.click();
  }


}
