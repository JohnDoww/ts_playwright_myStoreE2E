import { Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class OrderDeliveryForm extends BaseComp {
  private submitBtn: Locator = this.page.locator("#delivery-address .continue.btn");

  async clickSubmitBtn() {
    await this.submitBtn.waitFor();
    await this.submitBtn.click();
  }
}
