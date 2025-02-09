import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
  protected page: Page;
  searchInputLocator: Locator;
  loaderLocator: Locator;

  proposedItemsInSearchLocator: Locator;
  searchLocator: Locator;

  cartBtn: Locator;
  inCartCounterLocator: Locator;

  signInLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInputLocator = page.locator('[aria-label="Search"]');
    this.loaderLocator = page.locator(".overlay__content");
    this.proposedItemsInSearchLocator = page.locator(".ui-menu-item");
    this.searchLocator = page.locator('[aria-label="Search"]');
    this.cartBtn = page.locator("#_desktop_cart");
    this.inCartCounterLocator = page.locator(".header .cart-products-count");

    this.signInLink = page.locator(".user-info .hidden-sm-down");
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
    if (await this.loaderLocator.isVisible()) {
      await this.loaderLocator.waitFor({ state: "detached" });
    }
  }

  async returnAllLocators(locator) {
    await locator.first().waitFor();

    const allSectionLocators = await locator.all();

    return allSectionLocators;
  }

  async goToCart() {
    await this.cartBtn.waitFor();
    await this.cartBtn.click();
    await this.page.waitForLoadState();
  }

  async fillForm(orderData: Record<string, string>) {
    if (orderData) {
      for (const [key, value] of Object.entries(orderData)) {
        // handle checboxes
        if (value === "true") {
          await this.page.getByLabel(key).click();
          continue;
        }
        // handle item names
        if (key === "testTitle" || value === "false") {
          continue;
        }
        // handle state dropdown
        if (key === "State") {
          await this.page.getByLabel(key).selectOption(value);
          continue;
        }
        // handle Address field
        if (key === "Address") {
          await this.page.locator("#field-address1").click();
          await this.page.locator("#field-address1").fill(value);
          continue;
        }

        await this.page.getByLabel(key).click();
        await this.page.getByLabel(key).fill(value);
      }
    }
  }

  responseWaiter(toInclude) {
    return this.page.waitForResponse((response) =>
      response.url().includes(toInclude)
    );
  }

  async waitElementsAppearance(elements: Locator, neededAmount = 1) {
    await elements.first().waitFor();
    await expect
      .poll(
        async () => {
          let visibleItem = 0;
          for (const el of await elements.all()) {
            if (await el.isVisible()) visibleItem++;
          }
          return visibleItem;
        },
        {
          intervals: [500, 1_000],
          timeout: 30_000,
        }
      )
      .toBe(neededAmount);
  }

  async clickSignInLink() {
    await this.signInLink.waitFor();
    await this.signInLink.click();
  }
}
