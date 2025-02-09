import { expect, Locator, Page } from "@playwright/test";
import { SearchComponent } from "../components/SearchComponent";
import { CartDisplayComponent } from "../components/CartDisplayComponent";
import { LoaderComponent } from "../components/LoaderComponent";
import { UserIndicatorComponent } from "../components/UserIndicatorComponent";
import { RegistrationFormComponent } from "../components/RegistrationFormComponent";
import { LoginFormComponent } from "../components/LoginFormComponent";
import { AddToCartComponent } from "../components/AddToCartComponent";
export class BasePage {
  protected page: Page;
  searchComp: SearchComponent;
  cartDisplayComp: CartDisplayComponent;
  loaderComp: LoaderComponent;
  userIndicatorComp: UserIndicatorComponent;
  logFormComp: LoginFormComponent;
  regFormComp: RegistrationFormComponent;
  addToCartComp: AddToCartComponent;
  // breadcrumbComp: BreadCrumbComponent;

  constructor(page: Page) {
    this.page = page;
    this.searchComp = new SearchComponent(page);
    this.cartDisplayComp = new CartDisplayComponent(page);
    this.loaderComp = new LoaderComponent(page);
    this.userIndicatorComp = new UserIndicatorComponent(page);
    this.logFormComp = new LoginFormComponent(page);
    this.regFormComp = new RegistrationFormComponent(page);
    this.addToCartComp = new AddToCartComponent(page);
    // this.breadcrumbComp = new BreadCrumbComponent(page)
  }

  async goTo(url: string = "/") {
    await this.page.goto(url);
  }

  async fillInSearch(searchValue: string) {
    await this.searchComp.fillIn(searchValue);
  }

  async searchForItem(searchValue: string) {
    await this.searchComp.findItem(searchValue);
  }

  async loaderHandler() {
    await this.loaderComp.becomeHidden();
  }

  async returnAllLocators(locator) {
    await locator.first().waitFor();

    const allSectionLocators = await locator.all();

    return allSectionLocators;
  }

  async goToCart() {
    await this.cartDisplayComp.clickOnBtn();
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
    await this.userIndicatorComp.clickSignIn();
  }
}
