import { Page } from "@playwright/test";
import { step } from "../../utils/helpers/stepDecorator";
import { Item } from "../components/Item.component";
import { OrderDeliveryForm } from "../components/OrderDeliveryForm.component";
import { OrderConfirmed } from "../components/OrderConfirmed.component";
import { PaymentForm } from "../components/PaymentForm.component";
import { ShippingMethod } from "../components/ShippingMethod.component";
import { BasePage } from "./BasePage.abstract";

export class OrderPage extends BasePage {
  private itemDescComp: Item;
  private orderDeliveryFormComp: OrderDeliveryForm;
  private orderConfirmedComp: OrderConfirmed;
  private paymentFormComp: PaymentForm;
  private shippingMethodComp: ShippingMethod;
  private url: string = "?controller=order";

  constructor(page: Page) {
    super(page);
    this.itemDescComp = new Item(page);
    this.orderDeliveryFormComp = new OrderDeliveryForm(page);
    this.orderConfirmedComp = new OrderConfirmed(page);
    this.paymentFormComp = new PaymentForm(page);
    this.shippingMethodComp = new ShippingMethod(page);
  }

  @step("Open order page")
  async goTo() {
    await this.page.goto(this.url);
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
    return this.itemDescComp.inCreatedOrder.title;
  }
}
