import { Page, expect } from "@playwright/test";
import { step } from "../../utils/helpers/stepDecorator";
import { BasePage } from "./BasePage";
import { FunctionHelpers } from "../../utils/helpers/FunctionHelpers";
import { ComponentsHolder } from "../components/ComponentsHolder";

export class CatalogPage {
  private page: Page;
  private helper: FunctionHelpers;
  private compHold: ComponentsHolder;
  private basePage: BasePage;
  private url: string = "?id_category=2&controller=category";
  private requestAfterApplyingFilters: string =
    "module=productcomments&controller=CommentGrade";

  constructor(page: Page) {
    this.page = page;
    this.helper = new FunctionHelpers(page);
    this.compHold = new ComponentsHolder(page);
    this.basePage = new BasePage(page);
  }

  @step("Open catalog page")
  async goTo() {
    await this.basePage.goTo(this.url);
  }

  @step("Open item")
  async openItem(itemOrder: number = 0) {
    await this.page.waitForLoadState("load");
    await this.compHold.itemDesc.onPreview.title.nth(itemOrder).waitFor();
    await this.compHold.itemDesc.onPreview.title.nth(itemOrder).click();
    await this.page.waitForLoadState("load");
  }

  async getItemTitle(itemOrder: number = 0) {
    const itemDescText = await this.helper.getElementText(
      this.compHold.itemDesc.onPreview.title.nth(itemOrder)
    );
    return itemDescText;
  }

  @step("Get all items description")
  async returnAllItemsDescriptionOnPage() {
    await this.compHold.itemDesc.onPreview.title.last().waitFor();
    return await this.compHold.itemDesc.onPreview.title.all();
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
      this.compHold.filterSections.itemsPerFilter(filterLocator)
    );
    return await this.helper.extractNumberFromStr(productsAmountOnFilter);
  }

  @step("Compare amount of items per filter and items in catalog")
  async compareAmountItemsOnPageAndOnFilter(filterOptions) {
    for (const testFilter of await filterOptions) {
      const filterCheckbox = this.compHold.filterSections.checkbox(testFilter);

      await this.page.waitForLoadState("load");
      await testFilter.waitFor();
      const waitTillNeededResponse = this.helper.responseWaiter(
        this.requestAfterApplyingFilters
      );
      await filterCheckbox.click();
      await expect(filterCheckbox).toBeChecked({ timeout: 20_000 });
      await waitTillNeededResponse;

      await this.basePage.loaderHandler();

      const itemsForFilter = await this.returnItemAmountForFilter(
        await testFilter
      );

      const exactAmountOfProducts = (
        await this.returnAllItemsDescriptionOnPage()
      ).length;

      expect(itemsForFilter).toBe(exactAmountOfProducts);

      await filterCheckbox.click();

      await this.basePage.loaderHandler();
      await this.page.waitForLoadState("load");
    }
  }
  @step("Get composition filters")
  async getCompositionFilters() {
    return await this.helper.returnAllLocators(
      this.compHold.filterSections.compositionSection
    );
  }
}
