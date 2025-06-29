import { Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class PaymentForm extends BaseComp {
  private submitBtn: Locator = this.page.locator("#payment-confirmation button");
  private payByBankCheckbox: Locator = this.page.locator("#payment-option-1");
  private acceptTermsCheckbox: Locator = this.page.locator("#conditions-to-approve");

  async clickAcceptTermsCheckbox() {
    await this.acceptTermsCheckbox.waitFor();
    await this.acceptTermsCheckbox.click();
  }

  async setPaymentByBank() {
    await this.payByBankCheckbox.waitFor();
    await this.payByBankCheckbox.click();
  }

  async clickSubmitBtn() {
    await this.submitBtn.waitFor();
    await this.submitBtn.click();
  }
}
