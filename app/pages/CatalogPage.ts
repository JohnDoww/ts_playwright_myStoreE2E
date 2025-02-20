import { Page, expect } from "@playwright/test";
import { step } from "../../utils/helpers/stepDecorator";
import { HomePage } from "./HomePage";
import { FunctionHelpers } from "../../utils/helpers/FunctionHelpers";
import { ItemDescription } from "../components/ItemDescription.component";
import { FilterSections } from "../components/FilterSections.component";

export class CatalogPage {
  private page: Page;
  private helper: FunctionHelpers;
  private itemDesc: ItemDescription;
  private filterSections: FilterSections;
  private homePage: HomePage;
  private url: string = "?id_category=2&controller=category";
  private requestAfterApplyingFilters: string =
    "module=productcomments&controller=CommentGrade";

  constructor(page: Page) {
    this.page = page;
    this.helper = new FunctionHelpers(page);
    this.itemDesc = new ItemDescription(page);
    this.filterSections = new FilterSections(page);
    this.homePage = new HomePage(page);
  }

  @step("Open catalog page")
  async goTo() {
    await this.homePage.goTo(this.url);
  }

  @step("Open item")
  async openItem(itemOrder: number = 0) {
    await this.page.waitForLoadState("load");
    await this.itemDesc.onPreview.title.nth(itemOrder).waitFor();
    await this.itemDesc.onPreview.title.nth(itemOrder).click();
    await this.page.waitForLoadState("load");
  }

  async getItemTitle(itemOrder: number = 0) {
    const itemDescText = await this.helper.getElementText(
      this.itemDesc.onPreview.title.nth(itemOrder)
    );
    return itemDescText;
  }

  @step("Get all items description")
  async returnAllItemsDescriptionOnPage() {
    await this.itemDesc.onPreview.title.last().waitFor();
    return await this.itemDesc.onPreview.title.all();
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

      await this.homePage.loaderHandler();

      const itemsForFilter = await this.returnItemAmountForFilter(
        await testFilter
      );

      const exactAmountOfProducts = (
        await this.returnAllItemsDescriptionOnPage()
      ).length;

      expect(itemsForFilter).toBe(exactAmountOfProducts);

      await filterCheckbox.click();

      await this.homePage.loaderHandler();
      await this.page.waitForLoadState("load");
    }
  }
  @step("Get composition filters")
  async getCompositionFilters() {
    return await this.helper.returnAllLocators(
      this.filterSections.compositionSection
    );
  }
}
