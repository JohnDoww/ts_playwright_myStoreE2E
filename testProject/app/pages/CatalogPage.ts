import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CatalogPage extends BasePage {
  private url: string = "?id_category=2&controller=category";
  private requestAfterApplyingFilters: string =
    "module=productcomments&controller=CommentGrade";

  constructor(page: Page) {
    super(page);
  }

  async goTo() {
    await super.goTo(this.url);
  }

  async openItem(itemOrder: number = 0) {
    await this.page.waitForLoadState("load");
    await this.itemDescComp.onPreview.title.nth(itemOrder).waitFor();
    await this.itemDescComp.onPreview.title.nth(itemOrder).click();
    await this.page.waitForLoadState("load");
  }

  async returnAllItemsDescriptionOnPage() {
    await this.itemDescComp.onPreview.title.last().waitFor();
    return await this.itemDescComp.onPreview.title.all();
  }

  async setFilter(filterToActivate) {
    await filterToActivate.waitFor();
    await filterToActivate.click();
  }

  async returnItemAmountForFilter(filterLocator) {
    await filterLocator.first().waitFor();
    const productsAmountOnFilter = await this.filterSectionsComp
      .itemsPerFilter(filterLocator)
      .innerText();
    return await super.extractNumberFromStr(productsAmountOnFilter);
  }

  async compareAmountItemsOnPageAndOnFilter(filterOptions) {
    for (const testFilter of await filterOptions) {
      const filterCheckbox = this.filterSectionsComp.checkbox(testFilter);

      await this.page.waitForLoadState("load");
      await testFilter.waitFor();

      const waitTillNeededResponse = super.responseWaiter(
        this.requestAfterApplyingFilters
      );

      await filterCheckbox.click();
      await expect(filterCheckbox).toBeChecked({ timeout: 20_000 });
      await waitTillNeededResponse;

      await super.loaderHandler();

      const itemsForFilter = await this.returnItemAmountForFilter(
        await testFilter
      );

      const exactAmountOfProducts =
        await this.returnAllItemsDescriptionOnPage();

      expect(itemsForFilter).toBe(exactAmountOfProducts.length);

      await filterCheckbox.click();

      await super.loaderHandler();
      await this.page.waitForLoadState("load");
    }
  }
}
