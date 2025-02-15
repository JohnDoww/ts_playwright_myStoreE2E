import { Page } from "@playwright/test";
import { Search } from "./components/Search.component";
import { CartDisplay } from "./components/CartDisplay.component";
import { Loader } from "./components/Loader.component";
import { UserIndicator } from "./components/UserIndicator.component";
import { RegistrationForm } from "./components/RegistrationForm.component";
import { LoginForm } from "./components/LoginForm.component";
import { AddToCart } from "./components/AddToCart.component";
import { BreadCrumbs } from "./components/BreadCrumbs.component";
import { ItemDescription } from "./components/ItemDescription.component";
import { AddedItemModal } from "./components/AddedItemModal.component";
import { ItemAmountManager } from "./components/ItemAmountManager.component";
import { FilterSectionsComponent } from "./components/FilterSections.component";
import { CartSummary } from "./components/CartSummary.component";
import { OrderDeliveryForm } from "./components/OrderDeliveryForm.component";
import { ShippingMethod } from "./components/ShippingMethod.component";
import { PaymentForm } from "./components/PaymentForm.component";
import { OrderConfirmed } from "./components/OrderConfirmed.component";

export class ComponentsHolder {
  private page: Page;
  search: Search;
  cartDisplay: CartDisplay;
  loader: Loader;
  userIndicator: UserIndicator;
  logForm: LoginForm;
  regForm: RegistrationForm;
  addToCart: AddToCart;
  breadcrumb: BreadCrumbs;
  itemDesc: ItemDescription;
  modalAfterItemAdd: AddedItemModal;
  itemAmountManager: ItemAmountManager;
  filterSections: FilterSectionsComponent;
  cartSummary: CartSummary;
  orderDeliveryFrom: OrderDeliveryForm;
  shippingMethod: ShippingMethod;
  paymentForm: PaymentForm;
  orderConfirmed: OrderConfirmed;

  constructor(page: Page) {
    this.page = page;
    this.search = new Search(page);
    this.loader = new Loader(page);
    this.cartDisplay = new CartDisplay(page);
    this.userIndicator = new UserIndicator(page);
    this.loader = new Loader(page);
    this.userIndicator = new UserIndicator(page);
    this.logForm = new LoginForm(page);
    this.regForm = new RegistrationForm(page);
    this.addToCart = new AddToCart(page);
    this.breadcrumb = new BreadCrumbs(page);
    this.itemDesc = new ItemDescription(page);
    this.modalAfterItemAdd = new AddedItemModal(page);
    this.itemAmountManager = new ItemAmountManager(page);
    this.filterSections = new FilterSectionsComponent(page);
    this.cartSummary = new CartSummary(page);
    this.orderDeliveryFrom = new OrderDeliveryForm(page);
    this.shippingMethod = new ShippingMethod(page);
    this.paymentForm = new PaymentForm(page);
    this.orderConfirmed = new OrderConfirmed(page);
  }
}
