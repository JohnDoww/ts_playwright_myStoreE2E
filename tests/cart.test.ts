import { test, expect } from "@playwright/test";
import { guest } from "../fixtures/fixtures";

test.describe("Cart", () => {
  guest("STORE-005. Increase item quantity", async ({ shopPages }) => {
    let defaultAmountOfNeededItems = 1;

    await shopPages.catalog.openItem();
    await shopPages.item.addToCart();
    await shopPages.item.closeConfirmAddingModal();
    await shopPages.home.goToCart();

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
    await shopPages.home.goToCart();

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
    await shopPages.home.goTo();

    await shopPages.catalog.openItem(3);
    await shopPages.item.addToCart();
    expectedAmountOfItemsInCart += 1;
    await shopPages.item.closeConfirmAddingModal();

    await shopPages.home.goToCart();
    let itemsInCart = await shopPages.cart.allAddedItem();
    expect(await itemsInCart.length).toBe(expectedAmountOfItemsInCart);

    await shopPages.cart.removeItem();
    itemsInCart = await shopPages.cart.allAddedItem();
    expect(await itemsInCart.length).toBe(expectedAmountOfItemsInCart - 1);

    await shopPages.cart.removeItem();
    await expect(await shopPages.cart.addedItem()).toBeHidden();
  });

  guest(
    "STORE-008. Cart logo has indicator of items in",
    async ({ shopPages }) => {
      const cartItemsCounter = shopPages.home.getCartCounter();
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
