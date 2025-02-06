import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CatalogPage } from "./CatalogPage";
import { ItemPage } from "./ItemPage";
import { CartPage } from "./CartPage";

export class PageHolder {
  page: Page;
  base: BasePage;
  catalog: CatalogPage;
  item: ItemPage;
  cart: CartPage;

  constructor(page: Page) {
    this.page = page;
    this.base = new BasePage(page);
    this.catalog = new CatalogPage(page);
    this.item = new ItemPage(page);
    this.cart = new CartPage(page);
  }
}
