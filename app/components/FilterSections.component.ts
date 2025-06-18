import { Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class FilterSections extends BaseComp {
  private compositionSection: Locator = this.page.locator('//*[contains(text(), "Composition")]//following-sibling::ul//li');
  private itemsInFilter: string = "//a//span";
  private checkboxInFilter: string = "//*[@class='custom-checkbox']";

  itemsPerFilter(filter: Locator) {
    const amountOfItems: Locator = filter.locator(this.itemsInFilter);
    return amountOfItems;
  }
  checkbox(filter: Locator) {
    const checkboxForFilter: Locator = filter.locator(this.checkboxInFilter);
    return checkboxForFilter;
  }

  async getCompositionSectionFilters(){
    await this.compositionSection.waitFor();
    return this.compositionSection;
  }
}
