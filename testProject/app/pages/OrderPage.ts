import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class OrderPage extends BasePage {
  private submitDeliveryInfoBtn: Locator;
  private submitShippingMethodBtn: Locator;
  private payByBankRadio: Locator;
  private acceptTermsRadio: Locator;
  private finalOrderSubmitBtn: Locator;
  successOrderMsgLocator: Locator;
  itemInPayConfirmationLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.submitDeliveryInfoBtn = page.locator(
      "#delivery-address .continue.btn"
    );
    this.submitShippingMethodBtn = page.locator("#js-delivery button");

    this.payByBankRadio = page.locator("#payment-option-1");
    this.acceptTermsRadio = page.locator("#conditions-to-approve");
    this.finalOrderSubmitBtn = page.locator("#payment-confirmation button");
    this.successOrderMsgLocator = page.locator(".h1.card-title");
    this.itemInPayConfirmationLocator = page.locator(".order-line.row");
  }

  async passOrderCreationForm(shippingData) {
    await super.fillForm(shippingData);
    await this.submitDeliveryInfoBtn.click();
    await this.submitShippingMethodBtn.click();

    await this.payByBankRadio.click();
    await this.acceptTermsRadio.click();
    await this.finalOrderSubmitBtn.click();

    await this.successOrderMsgLocator.waitFor();
  }
}
