import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";
import { CatalogPage } from "./CatalogPage";
import { ItemPage } from "./ItemPage";
import { CartPage } from "./CartPage";
import { OrderPage } from "./OrderPage";
import { UserRegistrationPage } from "./UserRegistrationPage";
import { LoginPage } from "./LoginPage";

export class PageHolder {
  private page: Page;
  home: HomePage;
  catalog: CatalogPage;
  item: ItemPage;
  cart: CartPage;
  order: OrderPage;
  userRegistration: UserRegistrationPage;
  login: LoginPage;

  constructor(page: Page) {
    this.page = page;
    this.home = new HomePage(page);
    this.catalog = new CatalogPage(page);
    this.item = new ItemPage(page);
    this.cart = new CartPage(page);
    this.order = new OrderPage(page);
    this.userRegistration = new UserRegistrationPage(page);
    this.login = new LoginPage(page);
  }
}
