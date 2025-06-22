import { expect } from "@playwright/test";
import { guestTest, loginUserTest } from "../fixtures/fixtures";
import { regData as testData } from "../utils/testData/registrationDataObjects";
import dataGenerator from "../utils/testData/dataGenerator";

guestTest.describe("User flows", { tag: "@S2d56dfe0" }, () => {
  for (let inputData of testData) {
    guestTest(
      `STORE-009:Registration with ${inputData.testTitle} data`,
      { tag: "@Tdc9d6660" },
      async ({ shopPages }) => {
        await shopPages.userRegistration.openNewUserRegistrationPage();
        await shopPages.userRegistration.fillRegistrationForm(inputData);
        await shopPages.userRegistration.submitRegistrationForm();

        expect(
          await shopPages.userRegistration.getTextOfUserIndicator()
        ).toContain(inputData["First name"]);
        expect(
          await shopPages.userRegistration.getTextOfUserIndicator()
        ).toContain(inputData["Last name"]);
      }
    );
  }

  loginUserTest(
    "STORE-010: Order item",
    { tag: "@T6f9bde41" },
    async ({ shopPages }) => {
      const successOrderMsgText = "Your order is confirmed";

      await shopPages.catalog.openItem(4);
      await shopPages.item.addToCart();
      await shopPages.item.closeConfirmAddingModal();

      const titleOfOrderedItem = await (
        await shopPages.item.getTitle()
      ).innerText();

      await shopPages.home.goToCart();
      await shopPages.cart.clickProceedToCheckoutBtn();
      const shippingInfo = dataGenerator.getShippingInfo();
      await shopPages.order.passOrderCreationForm(shippingInfo);

      await expect(
        await shopPages.order.getOrderConfirmationTitle()
      ).toContainText(successOrderMsgText);
      await expect(await shopPages.order.getOrderedItemTitle()).toContainText(
        titleOfOrderedItem,
        { ignoreCase: true }
      );
    }
  );

  loginUserTest(
    "STORE-011: Item added to wishlist",
    { tag: "@T104426a8" },
    async ({ shopPages }) => {
      const itemTitle = (await shopPages.catalog.getItemTitle(5)).toLowerCase();
      await shopPages.home.addItemToWishlist(5);
      await expect(
        shopPages.home.getSuccessfullyAddedToWishlistMsg()
      ).toBeVisible();

      await shopPages.myAcc.goTo();
      await shopPages.myAcc.openSettings("wishList");
      await shopPages.myAcc.waitForLists();
      expect(await shopPages.myAcc.getAmountOfItemsInWishList()).toEqual(1);

      await shopPages.myAcc.openWishList("My wishlist");
      expect(itemTitle).toEqual(
        (await shopPages.myAcc.getItemTitleInWishList(0)).toLowerCase()
      );
    }
  );
});
