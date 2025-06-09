import { Page, Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class OrderDeliveryForm extends BaseComp {
  private submitBtn: Locator = this.page.locator(
    "#delivery-address .continue.btn"
  );

  constructor(page: Page) {
    super(page);
  }

  async submitInfo() {
    await this.submitBtn.waitFor();
    await this.submitBtn.click();
  }
}
