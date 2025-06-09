import { Page } from "@playwright/test";
import { BasePage } from "./BasePage.abstract";
import { UserIndicator } from "../components/UserIndicator.component";
import { SettingsTales } from "../components/SettingsTales.component";
import { WishList } from "../components/WishList.component";
import { Item } from "../components/Item.component";
import { step } from "../../utils/helpers/stepDecorator";

export class MyAccountPage extends BasePage {
  private userIndicatorComp: UserIndicator;
  private settingsTalesComp: SettingsTales;
  private wishListComp: WishList;
  private itemComp: Item;

  constructor(page: Page) {
    super(page);
    this.wishListComp = new WishList(page);
    this.settingsTalesComp = new SettingsTales(page);
    this.userIndicatorComp = new UserIndicator(page);
    this.itemComp = new Item(page);
  }

  @step("Go to MyAccount page")
  async goTo() {
    await this.userIndicatorComp.profileLink.click();
  }

  @step("Open settings section")
  async openSettings(section: "wishList" | "myInformation") {
    switch (section) {
    case "wishList":
      await this.settingsTalesComp.myWishlistSettings.click();
      break;
    case "myInformation":
      await this.settingsTalesComp.myInformationSettings.click();
      break;
    }
  }

  @step("Get num of items  inside the list")
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
  async getItemTitleInWishList(itemOrder: number = 0): Promise<string> {
    const itemDescText = await this.helper.getElementText(
      this.itemComp.preview.titleInWishList.nth(itemOrder)
    );
    return itemDescText;
  }
}
