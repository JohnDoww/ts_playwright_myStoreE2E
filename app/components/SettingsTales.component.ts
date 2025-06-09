import { Page, Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class SettingsTales extends BaseComp{
  readonly myWishlistSettings:Locator = this.page.locator("#wishlist-link");
  readonly myInformationSettings:Locator = this.page.locator("#identity-link");
  constructor(page:Page){
    super(page);
  }
}