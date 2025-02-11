import { Page } from "@playwright/test";
import { step } from "/Users/aprot/VSCodeProjects/ts-playwright-testProject/testProject/utils/helpers/stepDecorator";
import { FunctionHelpers } from "../../utils/helpers/FunctionHelpers";
import { ComponentsHolder } from "../components/ComponentsHolder";

export class OrderPage {
  private page: Page;
  private helper: FunctionHelpers;
  private compHold: ComponentsHolder;

  constructor(page: Page) {
    this.page = page;
    this.compHold = new ComponentsHolder(page);
    this.helper = new FunctionHelpers(page);
  }

  @step("Pass order creation form")
  async passOrderCreationForm(shippingData) {
    await this.helper.fillForm(shippingData);
    await this.compHold.orderDeliveryFrom.submitInfo();
    await this.compHold.shippingMethod.submitInfo();

    await this.compHold.paymentForm.setPaymentByBank();
    await this.compHold.paymentForm.acceptTerms();
    await this.compHold.paymentForm.submitInfo();

    await this.compHold.orderConfirmed.title.waitFor();
  }

  @step("Get order confirmation title")
  async getOrderConfirmationTitle() {
    return this.compHold.orderConfirmed.title;
  }

  @step("Get ordered item title")
  async getOrderedItemTitle() {
    return this.compHold.itemDesc.onCreatedOrder.title;
  }
}
