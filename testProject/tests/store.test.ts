import { expect } from "@playwright/test";
import { loginUser, guest } from "../fixtures/fixtures";
import { regData as testData } from "../utils/testData/registrationDataObjects";
import dataGenerator from "../utils/testData/dataGenerator";

guest("STORE-001: Found items contain search world", async ({ shopPages }) => {
  const searchRequest = "Mug";
  await shopPages.base.searchForItem(searchRequest);

  const allItems = await shopPages.catalog.returnAllItemsDescriptionOnPage();

  for (let item of allItems) {
    await expect(item).toContainText(searchRequest, { ignoreCase: true });
  }
});

guest(
  "STORE-002: Filter amount display right amount of items",
  async ({ shopPages }) => {
    await shopPages.catalog.goTo();

    const neededFilterSection = shopPages.catalog.compositionFiltersLocator;

    const filterOptions = await shopPages.base.returnAllLocators(
      neededFilterSection
    );

    await shopPages.catalog.compareAmountItemsOnPageAndOnFilter(filterOptions);
  }
);

guest(
  "STORE-003: Title from item preview match with titles on the item page",
  async ({ shopPages }) => {
    const itemTitle = await shopPages.catalog.itemDescriptionLocator
      .first()
      .innerText();

    await shopPages.catalog.openItem();

    await expect(shopPages.base.breadcrumbComp.body).toContainText(itemTitle, {
      ignoreCase: true,
    });
    await expect(shopPages.base.itemDescComp.main.title).toContainText(
      itemTitle,
      {
        ignoreCase: true,
      }
    );
  }
);

guest(
  "STORE-004. Proposed items in search match with search request",
  async ({ shopPages }) => {
    const searchRequest = "frame";

    await shopPages.base.fillInSearch(searchRequest);

    const searchProposals = await shopPages.base.returnAllLocators(
      shopPages.base.searchComp.proposedItems
    );
    for (let item of searchProposals) {
      await expect(item).toContainText(searchRequest, { ignoreCase: true });
    }
  }
);

guest("STORE-005. Increase item quantity +1 in cart", async ({ shopPages }) => {
  let defaultAmountOfNeededItems = 1;

  await shopPages.catalog.openItem();
  await shopPages.item.addToCart();
  await shopPages.item.closeConfirmAddingModal();
  await shopPages.base.goToCart();

  const amountOfAddedItem = await shopPages.cart.getAmountOfAddedItem();
  expect(amountOfAddedItem).toBe(`${defaultAmountOfNeededItems}`);

  await shopPages.cart.changeAmountOfAddedItem("+");

  const increasedAmountOfAddedItem =
    await shopPages.cart.getAmountOfAddedItem();
  defaultAmountOfNeededItems += 1;
  expect(increasedAmountOfAddedItem).toBe(`${defaultAmountOfNeededItems}`);
});

guest("STORE-006. Decrease item quantity -1 in cart", async ({ shopPages }) => {
  let amountOfItem = 1;

  await shopPages.catalog.openItem();

  await shopPages.item.changeAmountOfNeededItem("+");

  amountOfItem += 1;

  await shopPages.item.addToCart();
  await shopPages.item.closeConfirmAddingModal();
  await shopPages.base.goToCart();

  let amountOfAddedItem = await shopPages.cart.getAmountOfAddedItem();
  expect(amountOfAddedItem).toBe(`${amountOfItem}`);

  await shopPages.cart.changeAmountOfAddedItem("-");

  amountOfItem -= 1;

  amountOfAddedItem = await shopPages.cart.getAmountOfAddedItem();
  expect(amountOfAddedItem).toBe(`${amountOfItem}`);
});

guest("STORE-007. Delete all 2 items from the cart", async ({ shopPages }) => {
  let expectedAmountOfItemsInCart = 0;
  await shopPages.catalog.openItem();
  await shopPages.item.addToCart();
  expectedAmountOfItemsInCart += 1;
  await shopPages.item.closeConfirmAddingModal();

  await shopPages.base.goTo();

  await shopPages.catalog.openItem(3);
  await shopPages.item.addToCart();
  expectedAmountOfItemsInCart += 1;
  await shopPages.item.closeConfirmAddingModal();

  await shopPages.base.goToCart();
  await shopPages.cart.waitItemsAppearance(expectedAmountOfItemsInCart);

  const itemsInCart = shopPages.cart.addedItemLocator;
  expect((await itemsInCart.all()).length).toBe(expectedAmountOfItemsInCart);
  await shopPages.cart.removeItem();
  expect((await itemsInCart.all()).length).toBe(
    expectedAmountOfItemsInCart - 1
  );
  await shopPages.cart.removeItem();
  await expect(itemsInCart).not.toBeVisible();
});

guest(
  "STORE-008. Cart logo has indicator of items in cart",
  async ({ shopPages }) => {
    const cartItemsCounter = shopPages.base.cartDisplayComp.counter;

    let expectedCartCounterValue = 1;

    await shopPages.catalog.openItem();
    await shopPages.item.addToCart();
    await shopPages.item.closeConfirmAddingModal();

    expect(await cartItemsCounter.innerText()).toContain(
      `${expectedCartCounterValue}`
    );

    await shopPages.item.addToCart();
    await shopPages.item.closeConfirmAddingModal();
    expectedCartCounterValue += 1;

    await expect(cartItemsCounter).toBeVisible();
    expect(await cartItemsCounter.innerText()).toContain(
      `${expectedCartCounterValue}`
    );
  }
);

for (let inputData of testData) {
  guest(
    `STORE-009:User registration with ${inputData.testTitle} registration data`,
    async ({ shopPages }) => {
      const userIndicatorWhenLogin = shopPages.login.userProfileLink;

      await shopPages.userRegistration.openNewUserRegistrationPage();
      await shopPages.base.fillForm(inputData);

      await shopPages.userRegistration.submitRegistrationForm();

      await expect(userIndicatorWhenLogin).toContainText(
        inputData["First name"]
      );
      await expect(userIndicatorWhenLogin).toContainText(
        inputData["Last name"]
      );
    }
  );
}

loginUser("STORE-010: Order item", async ({ shopPages }) => {
  const proceedToCheckoutBtn = shopPages.cart.proceedToCheckoutBtn;
  const itemTitle = shopPages.base.itemDescComp.main.title;
  const finalSuccessMsg = shopPages.order.successOrderMsgLocator;
  const itemInSummary = shopPages.order.itemInPayConfirmationLocator;

  const successOrderMsgText = "Your order is confirmed";

  await shopPages.catalog.openItem(4);
  await shopPages.item.addToCart();
  await shopPages.item.closeConfirmAddingModal();

  const titleOfOrderedItem = await itemTitle.innerText();

  await shopPages.base.goToCart();

  await proceedToCheckoutBtn.click();

  const shippingInfo = dataGenerator.getShippingInfo();

  await shopPages.order.passOrderCreationForm(shippingInfo);

  await expect(finalSuccessMsg).toContainText(successOrderMsgText);
  await expect(itemInSummary).toContainText(titleOfOrderedItem, {
    ignoreCase: true,
  });
});
