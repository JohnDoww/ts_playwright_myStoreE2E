import { test, expect } from "@playwright/test";
import { loginUser, guest } from "../fixtures/fixtures";
import { regData as testData } from "../utils/testData/registrationDataObjects";

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
    await shopPages.base.goTo("?id_category=2&controller=category");

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
    await shopPages.base.goTo();

    const itemTitle = await shopPages.base.returnInnerText(
      shopPages.catalog.itemDescriptionLocator.first()
    );

    await shopPages.catalog.openItem();

    await expect(shopPages.item.bradCrumbLocator).toContainText(itemTitle, {
      ignoreCase: true,
    });
    await expect(shopPages.item.itemTitleLocator).toContainText(itemTitle, {
      ignoreCase: true,
    });
  }
);

guest(
  "STORE-004. Proposed items in search match with search request",
  async ({ shopPages }) => {
    const searchRequest = "frame ";

    await shopPages.base.goTo();
    await shopPages.base.fillInSearch(searchRequest);

    const searchProposals = await shopPages.base.returnAllLocators(
      shopPages.base.proposedItemsInSearchLocator
    );
    for (let item of searchProposals) {
      await expect(item).toContainText(searchRequest, { ignoreCase: true });
    }
  }
);

guest("STORE-005. Increase item quantity +1 in cart", async ({ shopPages }) => {
  let defaultAmountOfNeededItems = 1;

  await shopPages.base.goTo();

  await shopPages.catalog.openItem();
  await shopPages.item.addToCart();
  await shopPages.item.closeAddingConfirmModal();
  await shopPages.base.goToCart();

  const amountOfAddedItem = await shopPages.cart.getAmountOfAddedItem();
  expect(amountOfAddedItem).toBe(`${defaultAmountOfNeededItems}`);

  await shopPages.cart.increaseAmountOfAddedItem();

  const increasedAmountOfAddedItem =
    await shopPages.cart.getAmountOfAddedItem();
  defaultAmountOfNeededItems += 1;
  expect(increasedAmountOfAddedItem).toBe(`${defaultAmountOfNeededItems}`);
});

// test("STORE-006. Decrease item quantity -1 in cart", async ({ page }) => {
//   const itemOnHomePage = page.locator(".product-thumbnail img");
//   const addToCartBtn = page.locator(".product-quantity .add");
//   const modalAfterAddingItem = page.locator("#blockcart-modal .modal-header");
//   const closeModalBtn = page.locator("#blockcart-modal .close");
//   const cartBtn = page.locator("#_desktop_cart");
//   const amountOfAddedItemInCart = page.locator(
//     '[name="product-quantity-spin"]'
//   );
//   const increaseAmountOfAddedItems = page.locator(".bootstrap-touchspin-up");
//   const decreaseAmountOfAddedItems = page.locator(".bootstrap-touchspin-down");

//   let defaultAmountOfNeededItems = 1;

//   await page.goto("https://teststore.automationtesting.co.uk");
//   await itemOnHomePage.first().waitFor();

//   await itemOnHomePage.first().click();

//   await increaseAmountOfAddedItems.waitFor();
//   await increaseAmountOfAddedItems.click();
//   defaultAmountOfNeededItems += 1;

//   await addToCartBtn.click();

//   await modalAfterAddingItem.waitFor({ state: "visible" });

//   await closeModalBtn.click();
//   await cartBtn.click();

//   const amountOfAddedItem = await amountOfAddedItemInCart.getAttribute("value");
//   expect(amountOfAddedItem).toBe(`${defaultAmountOfNeededItems}`);

//   const waitTillNeededResponse = page.waitForResponse(
//     RegExp("^.*\\action=refresh\\b.*$")
//   );
//   await decreaseAmountOfAddedItems.click();
//   defaultAmountOfNeededItems -= 1;

//   await waitTillNeededResponse;
//   const increasedAmountOfAddedItem = await amountOfAddedItemInCart.getAttribute(
//     "value"
//   );
//   expect(increasedAmountOfAddedItem).toBe(`${defaultAmountOfNeededItems}`);
// });

// test("STORE-007. Delete all 2 items from the cart", async ({ page }) => {
//   const itemOnHomePage = page.locator(".product-thumbnail img");

//   const addToCartBtn = page.locator(".product-quantity .add");

//   const modalAfterAddingItem = page.locator("#blockcart-modal .modal-header");
//   const closeModalBtn = page.locator("#blockcart-modal .close");
//   const cartBtn = page.locator("#_desktop_cart");
//   const itemInCart = page.locator("li.cart-item");
//   const removeItemFromCartBtn = page.locator(
//     ".remove-from-cart .material-icons"
//   );

//   const expectedAmountOfItemsInCart = 2;

//   await page.goto("https://teststore.automationtesting.co.uk");
//   await itemOnHomePage.first().waitFor();
//   // await expect(itemOnHomePage.first()).toBeVisible();
//   await itemOnHomePage.first().click();

//   await addToCartBtn.waitFor({ state: "attached" });
//   // await expect(addToCartBtn).toBeVisible();

//   // await page.reload();
//   const waitForModalResponse1 = page.waitForResponse((response) =>
//     response.url().includes("controller")
//   );

//   await addToCartBtn.click();
//   await waitForModalResponse1;

//   await modalAfterAddingItem.waitFor({ state: "attached" });
//   await closeModalBtn.waitFor({ state: "attached" });
//   await closeModalBtn.click();
//   await page.goto("https://teststore.automationtesting.co.uk");

//   await itemOnHomePage.last().click();
//   const waitForModalResponse2 = page.waitForResponse((response) =>
//     response.url().includes("fc=module&module=ps_shoppingcart&controller")
//   );
//   await expect(addToCartBtn).toBeVisible();
//   await addToCartBtn.click();
//   await waitForModalResponse2;

//   await modalAfterAddingItem.waitFor({ state: "visible" });
//   // await expect(modalAfterAddingItem).toBeVisible();

//   await closeModalBtn.click();
//   await cartBtn.click();

//   await page.locator(".cart-overview.js-cart").waitFor({ state: "visible" });

//   await expect
//     .poll(
//       async () => {
//         let visibleCount = 0;
//         for (const e of await itemInCart.all()) {
//           if (await e.isVisible()) visibleCount++;
//         }
//         return visibleCount;
//       },
//       {
//         message: "Expected exactly 2 visible elements, but condition not met",
//         intervals: [500, 1_000], // Optional polling overrides
//         timeout: 20_000, // Timeout override
//       }
//     )
//     .toBe(2);

//   expect((await itemInCart.all()).length).toBe(expectedAmountOfItemsInCart);
//   const waitUpdatingStateOfCart = page.waitForResponse((response) =>
//     response.url().includes("fc=module&module=ps_shoppingcart&controller=ajax")
//   );

//   await removeItemFromCartBtn.first().click();

//   await waitUpdatingStateOfCart;
//   await page.reload();
//   await itemInCart.first().waitFor({ state: "attached" });
//   expect((await itemInCart.all()).length).toBe(expectedAmountOfItemsInCart - 1);

//   const waitUpdatingStateOfCart2 = page.waitForResponse((response) =>
//     response.url().includes("fc=module&module=ps_shoppingcart&controller=ajax")
//   );
//   await removeItemFromCartBtn.first().click();
//   await waitUpdatingStateOfCart2;

//   await expect(itemInCart).not.toBeVisible();
// });

// test("STORE-008. Cart logo has indicator of items in cart", async ({
//   page,
// }) => {
//   const itemOnHomePage = page.locator(".product-thumbnail img");

//   const addToCartBtn = page.locator(".product-quantity .add");
//   const closeModalBtn = page.locator("#blockcart-modal .close");
//   const modalAfterAddingItem = page.locator("#blockcart-modal .modal-header");
//   const neededItemOnItemPage = page.locator("#quantity_wanted");

//   const cartItemsCounter = page.locator(".header .cart-products-count");

//   let expectedCartCounterValue = 1;

//   await page.goto("https://teststore.automationtesting.co.uk");
//   await itemOnHomePage.first().waitFor();
//   await itemOnHomePage.first().click();

//   await addToCartBtn.waitFor({ state: "visible" });

//   const waitForModalResponse1 = page.waitForResponse((response) =>
//     response.url().includes("controller")
//   );

//   await addToCartBtn.click();
//   await waitForModalResponse1;

//   await modalAfterAddingItem.waitFor({ state: "attached" });

//   await closeModalBtn.click();

//   expect(await cartItemsCounter.innerText()).toContain(
//     `${expectedCartCounterValue}`
//   );

//   await neededItemOnItemPage.waitFor();
//   await neededItemOnItemPage.fill("3");
//   await neededItemOnItemPage.press("Enter");

//   await modalAfterAddingItem.waitFor();
//   await closeModalBtn.click();

//   expectedCartCounterValue += 3;

//   await expect(cartItemsCounter).toBeVisible();
//   expect(await cartItemsCounter.innerText()).toContain(
//     `${expectedCartCounterValue}`
//   );
// });

// async function fillOrderForm(page, orderData: Record<string, string>) {
//   if (orderData) {
//     for (const [key, value] of Object.entries(orderData)) {
//       if (value === "true") {
//         await page.getByLabel(key).click();
//         continue;
//       }
//       if (key === "testTitle" || value === "false") {
//         continue;
//       }
//       if (key === "State") {
//         await page.getByLabel(key).selectOption(value);
//         continue;
//       }
//       if (key === "Address") {
//         await page.locator("#field-address1").click();
//         await page.locator("#field-address1").fill(value);
//         continue;
//       }

//       await page.getByLabel(key).click();
//       await page.getByLabel(key).fill(value);
//     }
//   }
// }

// for (let inputData of testData) {
//   test(`STORE-009:User registration with ${inputData.testTitle} registration data`, async ({
//     page,
//   }) => {
//     // const signInLink = page.locator(".user-info a");
//     const signInLink = page.locator(".user-info .hidden-sm-down");
//     const createAccLink = page.locator(".no-account a");
//     const saveUserBtn = page.locator('[data-link-action="save-customer"]');
//     const accNameWhenLogin = page.locator("#_desktop_user_info");

//     await page.goto("https://teststore.automationtesting.co.uk");

//     await signInLink.waitFor();
//     await signInLink.click();

//     await createAccLink.waitFor();
//     await createAccLink.click();

//     await fillOrderForm(page, inputData);
//     const waitForModalResponse1 = page.waitForResponse((response) =>
//       response.url().includes("module=blockwishlist&controller=action")
//     );
//     await saveUserBtn.click();
//     await waitForModalResponse1;
//     const accNameee = page.locator('[title="View my customer account"]');
//     await expect(accNameee).toBeVisible({ timeout: 10_000 });

//     await expect(accNameWhenLogin).toContainText(inputData["First name"]);
//     if (inputData["Last name"].length > 3) {
//       await expect(accNameWhenLogin).toContainText(inputData["Last name"]);
//     }
//   });
// }

// loginUser("STORE-010: Order item", async ({ shopPages }) => {
//   const proceedToCheckoutBtn = shopPages.page.locator(".checkout .btn");
//   const itemOnHomePage = shopPages.page.locator(".product-thumbnail img");
//   const addToCartBtn = shopPages.page.locator(".product-quantity .add");
//   const modalAfterAddingItem = shopPages.page.locator(
//     "#blockcart-modal .modal-header"
//   );
//   const closeModalBtn = shopPages.page.locator("#blockcart-modal .close");
//   const cartBtn = shopPages.page.locator("#_desktop_cart");

//   const continueBtn = shopPages.page.locator("#delivery-address .continue.btn");
//   const deliverySubmitBtn = shopPages.page.locator("#js-delivery button");
//   const payByBankRadio = shopPages.page.locator("#payment-option-1");
//   const iAgreeRadio = shopPages.page.locator("#conditions-to-approve");
//   const paymentSubmitBtn = shopPages.page.locator(
//     "#payment-confirmation button"
//   );
//   const successOrderMsgLocator = shopPages.page.locator(".h1.card-title");
//   const successOrderMsgText = "Your order is confirmed";
//   const itemInPaymentConfirmation = shopPages.page.locator(".order-line.row");
//   const itemTitle = shopPages.page.locator("h1");

//   await shopPages.page.goto("https://teststore.automationtesting.co.uk");
//   await itemOnHomePage.first().waitFor();
//   await itemOnHomePage.first().click();
//   await addToCartBtn.waitFor();

//   // await shopPages.page.reload();
//   const waitForModalResponse1 = shopPages.page.waitForResponse((response) =>
//     response.url().includes("controller")
//   );

//   const titleOfOrderedItem = await itemTitle.innerText();

//   await addToCartBtn.click();
//   await waitForModalResponse1;
//   await modalAfterAddingItem.waitFor({ state: "visible" });
//   await closeModalBtn.click();
//   await cartBtn.click();

//   await shopPages.page
//     .locator(".cart-overview.js-cart")
//     .waitFor({ state: "visible" });

//   await proceedToCheckoutBtn.click();

//   const orderInfo = {
//     Address: "ul Lili 12",
//     City: "Chichi",
//     Zip: "01123",
//     State: "Hawaii",
//   };

//   await fillOrderForm(shopPages.page, orderInfo);
//   await continueBtn.click();

//   await deliverySubmitBtn.click();
//   await payByBankRadio.click();
//   await iAgreeRadio.click();
//   await paymentSubmitBtn.click();

//   await successOrderMsgLocator.waitFor();
//   await expect(successOrderMsgLocator).toContainText(successOrderMsgText);
//   await expect(itemInPaymentConfirmation).toContainText(titleOfOrderedItem, {
//     ignoreCase: true,
//   });
// });
