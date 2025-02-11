import { Page } from "@playwright/test";
import { SearchComponent } from "./components/SearchComponent";
import { CartDisplayComponent } from "./components/CartDisplayComponent";
import { LoaderComponent } from "./components/LoaderComponent";
import { UserIndicatorComponent } from "./components/UserIndicatorComponent";
import { RegistrationFormComponent } from "./components/RegistrationFormComponent";
import { LoginFormComponent } from "./components/LoginFormComponent";
import { AddToCartComponent } from "./components/AddToCartComponent";
import { BreadCrumbsComponent } from "./components/BreadCrumbsComponent";
import { ItemDescriptionComponent } from "./components/ItemDescriptionComponent";
import { AddedItemModalComponent } from "./components/AddedItemModalComponent";
import { ItemAmountManagerComponent } from "./components/ItemAmountManagerComponent";
import { FilterSectionsComponent } from "./components/FilterSectionsComponent";
import { CartSummaryComponent } from "./components/CartSummaryComponent";
import { OrderDeliveryFormComponent } from "./components/OrderDeliveryFormComponent";
import { ShippingMethodComponent } from "./components/ShippingMethodComponent";
import { PaymentFormComponent } from "./components/PaymentFormComponent";
import { OrderConfirmedComponent } from "./components/OrderConfirmedComponent";

export class ComponentsHolder {
  private page: Page;
  search: SearchComponent;
  cartDisplay: CartDisplayComponent;
  loader: LoaderComponent;
  userIndicator: UserIndicatorComponent;
  logForm: LoginFormComponent;
  regForm: RegistrationFormComponent;
  addToCart: AddToCartComponent;
  breadcrumb: BreadCrumbsComponent;
  itemDesc: ItemDescriptionComponent;
  modalAfterItemAdd: AddedItemModalComponent;
  itemAmountManager: ItemAmountManagerComponent;
  filterSections: FilterSectionsComponent;
  cartSummary: CartSummaryComponent;
  orderDeliveryFrom: OrderDeliveryFormComponent;
  shippingMethod: ShippingMethodComponent;
  paymentForm: PaymentFormComponent;
  orderConfirmed: OrderConfirmedComponent;

  constructor(page: Page) {
    this.page = page;
    this.search = new SearchComponent(page);
    this.loader = new LoaderComponent(page);
    this.cartDisplay = new CartDisplayComponent(page);
    this.userIndicator = new UserIndicatorComponent(page);
    this.loader = new LoaderComponent(page);
    this.userIndicator = new UserIndicatorComponent(page);
    this.logForm = new LoginFormComponent(page);
    this.regForm = new RegistrationFormComponent(page);
    this.addToCart = new AddToCartComponent(page);
    this.breadcrumb = new BreadCrumbsComponent(page);
    this.itemDesc = new ItemDescriptionComponent(page);
    this.modalAfterItemAdd = new AddedItemModalComponent(page);
    this.itemAmountManager = new ItemAmountManagerComponent(page);
    this.filterSections = new FilterSectionsComponent(page);
    this.cartSummary = new CartSummaryComponent(page);
    this.orderDeliveryFrom = new OrderDeliveryFormComponent(page);
    this.shippingMethod = new ShippingMethodComponent(page);
    this.paymentForm = new PaymentFormComponent(page);
    this.orderConfirmed = new OrderConfirmedComponent(page);
  }
}
