import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { th } from "@faker-js/faker";

export class OrderPage {
    protected page: Page;
    protected basePage: BasePage;
    private submitDeliveryInfoBtn: Locator;
    private submitShippingMethodBtn: Locator;
    private payByBankRadio: Locator;
    private acceptTermsRadio: Locator;
    private finalOrderSubmitBtn: Locator;
    successOrderMsgLocator: Locator;
    itemInPayConfirmationLocator: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.basePage= new BasePage(page);
    this.submitDeliveryInfoBtn = page.locator("#delivery-address .continue.btn");
    this.submitShippingMethodBtn = page.locator("#js-delivery button");

    this.payByBankRadio = page.locator("#payment-option-1");
    this.acceptTermsRadio = page.locator("#conditions-to-approve");
    this.finalOrderSubmitBtn = page.locator(
      "#payment-confirmation button"
    );
    this.successOrderMsgLocator = page.locator(".h1.card-title");
    this.itemInPayConfirmationLocator = page.locator(".order-line.row");

  }

  async passOrderCreationForm(shippingData){
    
  await this.basePage.fillForm(shippingData);
  await this.submitDeliveryInfoBtn.click();
  await this.submitShippingMethodBtn.click();

  await this.payByBankRadio.click();
  await this.acceptTermsRadio.click();
  await this.finalOrderSubmitBtn.click();

  await this. successOrderMsgLocator.waitFor();
  }

}
