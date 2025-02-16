import { Page } from "@playwright/test";
import { step } from "../../utils/helpers/stepDecorator";
import { FunctionHelpers } from "../../utils/helpers/FunctionHelpers";
import { ItemDescription } from "../components/ItemDescription.component";
import { OrderDeliveryForm } from "../components/OrderDeliveryForm.component";
import { OrderConfirmed } from "../components/OrderConfirmed.component";
import { PaymentForm } from "../components/PaymentForm.component";
import { ShippingMethod } from "../components/ShippingMethod.component";

export class OrderPage {
  private page: Page;
  private itemDescComp: ItemDescription;
  private orderDeliveryFormComp: OrderDeliveryForm;
  private orderConfirmedComp: OrderConfirmed;
  private paymentFormComp: PaymentForm;
  private shippingMethodComp: ShippingMethod;
  private helper: FunctionHelpers;

  constructor(page: Page) {
    this.page = page;
    this.itemDescComp = new ItemDescription(page);
    this.orderDeliveryFormComp = new OrderDeliveryForm(page);
    this.orderConfirmedComp = new OrderConfirmed(page);
    this.paymentFormComp = new PaymentForm(page);
    this.shippingMethodComp = new ShippingMethod(page);
    this.helper = new FunctionHelpers(page);
  }

  @step("Pass order creation form")
  async passOrderCreationForm(shippingData) {
    await this.helper.fillForm(shippingData);
    await this.orderDeliveryFormComp.submitInfo();
    await this.shippingMethodComp.submitInfo();

    await this.paymentFormComp.setPaymentByBank();
    await this.paymentFormComp.acceptTerms();
    await this.paymentFormComp.submitInfo();

    await this.orderConfirmedComp.title.waitFor();
  }

  @step("Get order confirmation title")
  async getOrderConfirmationTitle() {
    return this.orderConfirmedComp.title;
  }

  @step("Get ordered item title")
  async getOrderedItemTitle() {
    return this.itemDescComp.onCreatedOrder.title;
  }
}
