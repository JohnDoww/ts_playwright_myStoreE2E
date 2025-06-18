import { expect } from "@playwright/test";
import { step } from "../../utils/helpers/stepDecorator";
import { Item } from "../components/Item.component";
import { FilterSections } from "../components/FilterSections.component";
import { BasePage } from "./BasePage.abstract";

export class CatalogPage extends BasePage {
  private url: string = "?id_category=2&controller=category";
  private requestAfterApplyingFilters: string =
    "module=productcomments&controller=CommentGrade";

  private itemDesc: Item = new Item(this.page);
  private filterSections: FilterSections = new FilterSections(this.page);



  @step("Open catalog page")
  async goTo() {
    await this.page.goto(this.url);
  }

  @step("Open item")
  async openItem(itemOrder: number) {
    await this.page.waitForLoadState("load");
    await this.itemDesc.preview.title.nth(itemOrder).waitFor();
    await this.itemDesc.preview.title.nth(itemOrder).click();
    await this.page.waitForLoadState("load");
  }

  @step("Store the item title")
  async getItemTitle(itemOrder: number) {
    const itemDescText = await this.helper.getElementText(
      this.itemDesc.preview.title.nth(itemOrder)
    );
    return itemDescText;
  }

  @step("Get all items description")
  async returnAllItemsDescriptionOnPage() {
    await this.itemDesc.preview.title.last().waitFor();
    return await this.itemDesc.preview.title.all();
  }

  @step("Click filter")
  async setFilter(filterToActivate) {
    await filterToActivate.waitFor();
    await filterToActivate.click();
  }

  @step("Get item amount per filter")
  async returnItemAmountForFilter(filterLocator) {
    await filterLocator.first().waitFor();
    const productsAmountOnFilter = await this.helper.getElementText(
      this.filterSections.itemsPerFilter(filterLocator)
    );
    return await this.helper.extractNumberFromStr(productsAmountOnFilter);
  }

  @step("Compare amount of items per filter and items in catalog")
  async compareAmountItemsOnPageAndOnFilter(filterOptions) {
    for (const testFilter of await filterOptions) {
      const filterCheckbox = this.filterSections.checkbox(testFilter);

      await this.page.waitForLoadState("load");
      await testFilter.waitFor();
      const waitTillNeededResponse = this.helper.responseWaiter(
        this.requestAfterApplyingFilters
      );
      await filterCheckbox.click();
      await expect(filterCheckbox).toBeChecked({ timeout: 20_000 });
      await waitTillNeededResponse;

      await this.loaderHandler();

      const itemsForFilter = await this.returnItemAmountForFilter(
        await testFilter
      );

      const exactAmountOfProducts = (
        await this.returnAllItemsDescriptionOnPage()
      ).length;

      expect(itemsForFilter).toBe(exactAmountOfProducts);

      await filterCheckbox.click();

      await this.loaderHandler();
      await this.page.waitForLoadState("load");
    }
  }

  @step("Get composition filters")
  async getCompositionFilters() {
    const sectionFilters =
      await this.filterSections.getCompositionSectionFilters();
    return await this.helper.returnAllLocators(sectionFilters);
  }
}
