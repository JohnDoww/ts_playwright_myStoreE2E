import { Locator } from "@playwright/test";
import { BaseComp } from "./Base.component";

export class SettingsTales extends BaseComp{
  private myWishlistSettings:Locator = this.page.locator("#wishlist-link");
  private myInformationSettings:Locator = this.page.locator("#identity-link");

  async clickMyWishlistTile() {
    await this.myWishlistSettings.waitFor();
    await this.myWishlistSettings.click();
  }

  async clickMyInformationTile() {
    await this.myInformationSettings.waitFor();
    await this.myInformationSettings.click();
  }
}