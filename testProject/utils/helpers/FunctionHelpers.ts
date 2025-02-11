import { Page, expect, Locator } from "@playwright/test";
import { step } from "./stepDecorator";

export class FunctionHelpers {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  @step("Get needed response")
  responseWaiter(toInclude: string) {
    return this.page.waitForResponse((response) =>
      response.url().includes(toInclude)
    );
  }

  @step("Collect needed elements")
  async returnAllLocators(locator) {
    await locator.first().waitFor();
    const allSectionLocators = await locator.all();
    return allSectionLocators;
  }

  @step("Wait item appearance")
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
      .toBeGreaterThanOrEqual(neededAmount);
  }

  async fillForm(orderData: Record<string, string>) {
    if (orderData) {
      for (const [key, value] of Object.entries(orderData)) {
        // handle checkboxes
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

   async extractNumberFromStr(str) {
    const extractFrom = str.match(/(\d+)/);
    let numberAmount = 0;
    if (Array.isArray(extractFrom)) {
      numberAmount = parseInt(extractFrom[0]);
    }
    return numberAmount;
  }

   async getElementText(element: Locator) {
    await element.waitFor();
    const extractedValue = await element.innerText();
    return extractedValue;
  }
}
