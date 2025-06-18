import { step } from "../../utils/helpers/stepDecorator";
import { Item } from "../components/Item.component";
import { OrderDeliveryForm } from "../components/OrderDeliveryForm.component";
import { OrderConfirmed } from "../components/OrderConfirmed.component";
import { PaymentForm } from "../components/PaymentForm.component";
import { ShippingMethod } from "../components/ShippingMethod.component";
import { BasePage } from "./BasePage.abstract";

export class OrderPage extends BasePage {
  private itemDescComp: Item= new Item(this.page);
  private orderDeliveryFormComp: OrderDeliveryForm = new OrderDeliveryForm(this.page);
  private orderConfirmedComp: OrderConfirmed= new OrderConfirmed(this.page);
  private paymentFormComp: PaymentForm = new PaymentForm(this.page);
  private shippingMethodComp: ShippingMethod = new ShippingMethod(this.page);
  private url: string = "?controller=order";

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
  }

  @step("Get order confirmation title")
  async getOrderConfirmationTitle() {
    return this.orderConfirmedComp.getTitleLocator();
  }

  @step("Get ordered item title")
  async getOrderedItemTitle() {
    return this.itemDescComp.inCreatedOrder.title;
  }
}
