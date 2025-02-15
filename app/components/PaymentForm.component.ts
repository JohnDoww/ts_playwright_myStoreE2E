import { Page, Locator } from "@playwright/test";

export class PaymentForm {
  protected page: Page;
  private submitBtn: Locator;
  private payByBankCheckbox: Locator;
  private acceptTermsCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.payByBankCheckbox = page.locator("#payment-option-1");
    this.acceptTermsCheckbox = page.locator("#conditions-to-approve");
    this.submitBtn = page.locator("#payment-confirmation button");
  }

  async acceptTerms() {
    await this.acceptTermsCheckbox.waitFor();
    await this.acceptTermsCheckbox.click();
  }

  async setPaymentByBank() {
    await this.payByBankCheckbox.waitFor();
    await this.payByBankCheckbox.click();
  }

  async submitInfo() {
    await this.submitBtn.waitFor();
    await this.submitBtn.click();
  }
}
