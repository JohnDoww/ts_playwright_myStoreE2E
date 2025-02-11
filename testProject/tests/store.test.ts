import { expect, test } from "@playwright/test";
import { loginUser, guest } from "../fixtures/fixtures";
import { regData as testData } from "../utils/testData/registrationDataObjects";
import dataGenerator from "../utils/testData/dataGenerator";

test.describe("Search", () => {
  guest(
    "STORE-001: Found items contain search world",
    async ({ shopPages }) => {
      const searchRequest = "Mug";
      await shopPages.base.searchForItem(searchRequest);
      const allItems =
        await shopPages.catalog.returnAllItemsDescriptionOnPage();

      for (let item of allItems) {
        await expect(item).toContainText(searchRequest, { ignoreCase: true });
      }
    }
  );

  guest(
    "STORE-002. Proposed items in search match with request",
    async ({ shopPages }) => {
      const searchRequest = "frame";
      await shopPages.base.fillInSearch(searchRequest);
      const searchProposals =
        await shopPages.base.returnProposedItemsInSearch();

      for (let item of searchProposals) {
        await expect(item).toContainText(searchRequest, { ignoreCase: true });
      }
    }
  );
});

test.describe("Filtering", () => {
  guest(
    "STORE-003: Filter amount display right amount of items",
    async ({ shopPages }) => {
      await shopPages.catalog.goTo();
      const filterOptions = await shopPages.catalog.getCompositionFilters();

      await shopPages.catalog.compareAmountItemsOnPageAndOnFilter(
        filterOptions
      );
    }
  );
});

test.describe("Item", () => {
  guest(
    "STORE-004: Title from item preview match with titles on the item page",
    async ({ shopPages }) => {
      const itemTitle = await shopPages.catalog.getItemTitle();

      await shopPages.catalog.openItem();

      await expect(await shopPages.item.getBreadcrumb()).toContainText(
        itemTitle,
        { ignoreCase: true }
      );
      await expect(await shopPages.item.getTitle()).toContainText(itemTitle, {
        ignoreCase: true,
      });
    }
  );
});

test.describe("Cart", () => {
  guest("STORE-005. Increase item quantity", async ({ shopPages }) => {
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

  guest("STORE-006. Decrease item quantity", async ({ shopPages }) => {
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

  guest("STORE-007. Delete all added items", async ({ shopPages }) => {
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
    let itemsInCart = await shopPages.cart.allAddedItem();
    expect(await itemsInCart.length).toBe(expectedAmountOfItemsInCart);

    await shopPages.cart.removeItem();
    itemsInCart = await shopPages.cart.allAddedItem();
    expect(await itemsInCart.length).toBe(expectedAmountOfItemsInCart - 1);

    await shopPages.cart.removeItem();
    await expect(await shopPages.cart.addedItem()).not.toBeVisible();
  });

  guest(
    "STORE-008. Cart logo has indicator of items in",
    async ({ shopPages }) => {
      const cartItemsCounter = shopPages.base.getCartCounter();
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
});

test.describe("User flows", () => {
  for (let inputData of testData) {
    guest(
      `STORE-009:Registration with ${inputData.testTitle} data`,
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

  loginUser("STORE-010: Order item", async ({ shopPages }) => {
    const successOrderMsgText = "Your order is confirmed";

    await shopPages.catalog.openItem(4);
    await shopPages.item.addToCart();
    await shopPages.item.closeConfirmAddingModal();

    const titleOfOrderedItem = await (
      await shopPages.item.getTitle()
    ).innerText();

    await shopPages.base.goToCart();
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
});
