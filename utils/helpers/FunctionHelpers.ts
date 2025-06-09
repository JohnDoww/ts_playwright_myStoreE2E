import { Page, expect, Locator } from "@playwright/test";
import { step } from "./stepDecorator";

export class FunctionHelpers {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  @step("Wait response")
  responseWaiter(toInclude: string) {
    return this.page.waitForResponse((response) =>
      response.url().includes(toInclude),
    );
  }

  @step("Collect elements")
  async returnAllLocators(locator: Locator) {
    await locator.first().waitFor();
    return await locator.all();
  }

  @step("Wait item appearance")
  async waitElementsAppearance(elements: Locator, neededAmount: number) {
    await expect
      .poll(
        async () => {
          const count = await elements.count();
          let visibleItems = 0;

          for (let i = 0; i < count; i++) {
            await elements.nth(i).waitFor();
            if (await elements.nth(i).isVisible()) {
              visibleItems++;
            }
          }
          return visibleItems;
        },
        {
          intervals: [500, 1000],
          timeout: 15_000,
        },
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
