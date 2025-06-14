import { test, expect } from "@playwright/test";
import { guest, loginUser } from "../fixtures/fixtures";
import { regData as testData } from "../utils/testData/registrationDataObjects";
import dataGenerator from "../utils/testData/dataGenerator";

test.describe("User flows @S2d56dfe0", () => {
  for (let inputData of testData) {
    guest(
      `STORE-009:Registration with ${inputData.testTitle} data @Tdc9d6660`,
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

  loginUser("STORE-010: Order item @T6f9bde41", async ({ shopPages }) => {
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
  });

  loginUser("STORE-011: Item added to wishlist @T104426a8", async ({ shopPages }) => {
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
      (await shopPages.myAcc.getItemTitleInWishList()).toLowerCase()
    );
  });
});
