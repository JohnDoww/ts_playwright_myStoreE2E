import { Page } from "@playwright/test";
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";
import { ItemPage } from "./pages/ItemPage";
import { CartPage } from "./pages/CartPage";
import { OrderPage } from "./pages/OrderPage";
import { UserRegistrationPage } from "./pages/UserRegistrationPage";
import { LoginPage } from "./pages/LoginPage";

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
