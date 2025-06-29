import { BasePage } from "./BasePage.abstract";
import { UserIndicator } from "../components/UserIndicator.component";
import { SettingsTales } from "../components/SettingsTales.component";
import { WishList } from "../components/WishList.component";
import { Item } from "../components/Item.component";
import { step } from "../../utils/helpers/stepDecorator";

export class MyAccountPage extends BasePage {
  private userIndicatorComp: UserIndicator = new UserIndicator(this.page);
  private settingsTalesComp: SettingsTales = new SettingsTales(this.page);
  private wishListComp: WishList = new WishList(this.page);
  private itemComp: Item = new Item(this.page);

  @step("Go to MyAccount page")
  async goTo() {
    await this.userIndicatorComp.profileLink.click();
  }

  @step("Open settings section")
  async openSettings(section: "wishList" | "myInformation") {
    switch (section) {
    case "wishList":
      await this.settingsTalesComp.clickMyWishlistTile();
      break;
    case "myInformation":
      await this.settingsTalesComp.clickMyInformationTile();
      break;
    }
  }

  @step("Get num of items inside the list")
  async getAmountOfItemsInWishList(
    listName: string = "My wishlist"
  ): Promise<number> {
    const itemsAmount = await this.wishListComp.getAmountOfItemsInside(
      listName
    );
    const result = await this.helper.extractNumberFromStr(itemsAmount);
    return result;
  }

  @step("Wait for wishlists")
  async waitForLists() {
    const wishlist = this.wishListComp.getList();
    this.helper.waitElementsAppearance(wishlist, 1);
  }

  @step("Open wishlist")
  async openWishList(name: string) {
    await this.wishListComp.getList().getByText(name).click();
  }

  @step("Get item title from wishlist")
  async getItemTitleInWishList(itemOrder: number): Promise<string> {
    await this.itemComp.getTitleLocator("inWishList").nth(itemOrder).waitFor();
    const itemTitle = await this.helper.getElementText(
      this.itemComp.getTitleLocator("inWishList").nth(itemOrder)
    );
    return itemTitle;
  }
}
