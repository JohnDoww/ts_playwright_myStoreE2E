import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class OrderPage extends BasePage {
  itemInPayConfirmationLocator: Locator;

  constructor(page: Page) {
    super(page);

    this.itemInPayConfirmationLocator = page.locator(".order-line.row");
  }

  async passOrderCreationForm(shippingData) {
    await super.fillForm(shippingData);
    await this.orderDeliveryFromComp.submitInfo();
    await this.shippingMethodComp.submitInfo();

    await this.paymentFormComp.setPaymentByBank();
    await this.paymentFormComp.acceptTerms();
    await this.paymentFormComp.submitInfo();

    await this.orderConfirmedComp.title.waitFor();
  }
}
