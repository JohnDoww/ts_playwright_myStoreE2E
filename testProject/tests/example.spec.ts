import { test, expect } from "@playwright/test";
import { loginUser } from "../fixtures/fixtures";
import { regData as testData } from "../utils/testData/registrationDataObjects";

test("STORE-001: Search word contains into search result items", async ({
  page,
}) => {
  const catalogItem = page.locator(".product-description");
  const searchInput = page.locator('[aria-label="Search"]');
  const searchRequest = "Mug";

  await page.goto("https://teststore.automationtesting.co.uk/index.php");

  await searchInput.waitFor({ state: "visible" });
  await searchInput.fill(searchRequest);
  await page.keyboard.press("Enter");

  await catalogItem.first().waitFor({ state: "visible" });

  for (let item of await catalogItem.all()) {
    await expect(item).toContainText(searchRequest, { ignoreCase: true });
  }
});

test("STORE-002: Filter amount display right amount of items", async ({
  page,
}) => {
  const catalogItem = page.locator(".product-description");
  const compositionFilterSection = page.locator("#facet_99832 li");
  const loader = page.locator(".spinner");

  await page.goto(
    "https://teststore.automationtesting.co.uk/index.php?id_category=2&controller=category"
  );

  for (const element of await compositionFilterSection.all()) {
    await expect(element).toBeVisible();
    await element.click();
    if (await loader.isVisible()) {
      await loader.waitFor({ state: "hidden" });
    }
    const productsAmountOnFilter = await element
      .locator("//a//span")
      .innerText();
    const numn = productsAmountOnFilter.match(/(\d+)/);
    let value = 0;
    if (Array.isArray(numn)) {
      value = parseInt(numn[0]);
    }

    const exactAmountOfProducts = await catalogItem.all();

    expect(value).toBe(exactAmountOfProducts.length);

    await element.click();
  }
});

test("STORE-003: Title from item preview match with titles on the item page", async ({
  page,
}) => {
  const bradCrumb = page.locator(".breadcrumb");
  const itemTitle = page.locator("h1");
  const catalogItem = page.locator(".product-miniature ");

  await page.goto(
    "https://teststore.automationtesting.co.uk/index.php?id_category=2&controller=category"
  );

  const itemTitile = await catalogItem
    .locator("  .product-description a")
    .first()
    .innerText();

  await catalogItem.first().waitFor({ state: "visible" });
  await catalogItem.first().click();

  await bradCrumb.waitFor();
  await expect(bradCrumb).toContainText(itemTitile, { ignoreCase: true });
  await expect(itemTitle).toContainText(itemTitile, { ignoreCase: true });
});

test("STORE-004. Proposed items in search match with search request", async ({
  page,
}) => {
  const proposedItemInSearch = page.locator(".ui-menu-item");
  const searchInput = page.locator('[aria-label="Search"]');
  const searchRequest = "frame ";

  await page.goto("https://teststore.automationtesting.co.uk");
  await searchInput.fill(searchRequest);

  await proposedItemInSearch.first().waitFor({ state: "visible" });

  for (let item of await proposedItemInSearch.all()) {
    await expect(item).toContainText(searchRequest, { ignoreCase: true });
  }
});

test("STORE-005. Increase item quantity +1 in cart", async ({ page }) => {
  const itemOnHomePage = page.locator(".product-thumbnail img");
  const addToCartBtn = page.locator(".product-quantity .add");
  const modalAfterAddingItem = page.locator("#myModalLabel");
  const closeModalBtn = page.locator("#blockcart-modal .close");
  const cartBtn = page.locator("#_desktop_cart");
  const amountOfAddedItemInCart = page.locator(
    '[name="product-quantity-spin"]'
  );
  const increaseAmountOfAddedItems = page.locator(".bootstrap-touchspin-up");

  let defaultAmountOfNeededItems = 1;

  await page.goto("https://teststore.automationtesting.co.uk");
  await itemOnHomePage.first().waitFor();
  await itemOnHomePage.first().click();

  await addToCartBtn.waitFor({ state: "visible" });

  const waitForModalResponse1 = page.waitForResponse((response) =>
    response.url().includes("controller")
  );

  await addToCartBtn.click();
  await waitForModalResponse1;

  await modalAfterAddingItem.waitFor({ state: "visible" });

  await closeModalBtn.waitFor();
  await closeModalBtn.click();
  await cartBtn.click();

  const amountOfAddedItem = await amountOfAddedItemInCart.getAttribute("value");
  expect(amountOfAddedItem).toBe(`${defaultAmountOfNeededItems}`);
  const waitTillNeededResponse = page.waitForResponse(
    RegExp("^.*\\action=refresh\\b.*$")
  );

  await increaseAmountOfAddedItems.click();

  await waitTillNeededResponse;
  const increasedAmountOfAddedItem = await amountOfAddedItemInCart.getAttribute(
    "value"
  );
  defaultAmountOfNeededItems += 1;
  expect(increasedAmountOfAddedItem).toBe(`${defaultAmountOfNeededItems}`);
});

test("STORE-006. Decrease item quantity -1 in cart", async ({ page }) => {
  const itemOnHomePage = page.locator(".product-thumbnail img");
  const addToCartBtn = page.locator(".product-quantity .add");
  const modalAfterAddingItem = page.locator("#blockcart-modal .modal-header");
  const closeModalBtn = page.locator("#blockcart-modal .close");
  const cartBtn = page.locator("#_desktop_cart");
  const amountOfAddedItemInCart = page.locator(
    '[name="product-quantity-spin"]'
  );
  const increaseAmountOfAddedItems = page.locator(".bootstrap-touchspin-up");
  const decreaseAmountOfAddedItems = page.locator(".bootstrap-touchspin-down");

  let defaultAmountOfNeededItems = 1;

  await page.goto("https://teststore.automationtesting.co.uk");
  await itemOnHomePage.first().waitFor();

  await itemOnHomePage.first().click();

  await increaseAmountOfAddedItems.waitFor();
  await increaseAmountOfAddedItems.click();
  defaultAmountOfNeededItems += 1;

  await addToCartBtn.click();

  await modalAfterAddingItem.waitFor({ state: "visible" });

  await closeModalBtn.click();
  await cartBtn.click();

  const amountOfAddedItem = await amountOfAddedItemInCart.getAttribute("value");
  expect(amountOfAddedItem).toBe(`${defaultAmountOfNeededItems}`);

  const waitTillNeededResponse = page.waitForResponse(
    RegExp("^.*\\action=refresh\\b.*$")
  );
  await decreaseAmountOfAddedItems.click();
  defaultAmountOfNeededItems -= 1;

  await waitTillNeededResponse;
  const increasedAmountOfAddedItem = await amountOfAddedItemInCart.getAttribute(
    "value"
  );
  expect(increasedAmountOfAddedItem).toBe(`${defaultAmountOfNeededItems}`);
});

test("STORE-007. Delete all 2 items from the cart", async ({ page }) => {
  const itemOnHomePage = page.locator(".product-thumbnail img");

  const addToCartBtn = page.locator(".product-quantity .add");

  const modalAfterAddingItem = page.locator("#blockcart-modal .modal-header");
  const closeModalBtn = page.locator("#blockcart-modal .close");
  const cartBtn = page.locator("#_desktop_cart");
  const itemInCart = page.locator("li.cart-item");
  const removeItemFromCartBtn = page.locator(
    ".remove-from-cart .material-icons"
  );

  const expectedAmountOfItemsInCart = 2;

  await page.goto("https://teststore.automationtesting.co.uk");
  await itemOnHomePage.first().waitFor();
  // await expect(itemOnHomePage.first()).toBeVisible();
  await itemOnHomePage.first().click();

  await addToCartBtn.waitFor();
  // await expect(addToCartBtn).toBeVisible();

  // await page.reload();
  const waitForModalResponse1 = page.waitForResponse((response) =>
    response.url().includes("controller")
  );

  await addToCartBtn.click();
  const response1 = await waitForModalResponse1;

  await modalAfterAddingItem.waitFor({ state: "attached" });
  await closeModalBtn.click();
  await page.goto("https://teststore.automationtesting.co.uk");

  await itemOnHomePage.last().click();
  const waitForModalResponse2 = page.waitForResponse((response) =>
    response.url().includes("fc=module&module=ps_shoppingcart&controller")
  );
  await expect(addToCartBtn).toBeVisible();
  await addToCartBtn.click();
  await waitForModalResponse2;

  await modalAfterAddingItem.waitFor({ state: "visible" });
  // await expect(modalAfterAddingItem).toBeVisible();

  await closeModalBtn.click();
  await cartBtn.click();

  await page.locator(".cart-overview.js-cart").waitFor({ state: "visible" });

  await expect
    .poll(
      async () => {
        let visibleCount = 0;
        for (const e of await itemInCart.all()) {
          if (await e.isVisible()) visibleCount++;
        }
        return visibleCount;
      },
      {
        message: "Expected exactly 2 visible elements, but condition not met",
        intervals: [500, 1_000], // Optional polling overrides
        timeout: 20_000, // Timeout override
      }
    )
    .toBe(2);

  expect((await itemInCart.all()).length).toBe(expectedAmountOfItemsInCart);
  const waitUpdatingStateOfCart = page.waitForResponse((response) =>
    response.url().includes("fc=module&module=ps_shoppingcart&controller=ajax")
  );

  await removeItemFromCartBtn.first().click();

  const waitResponse3 = await waitUpdatingStateOfCart;
  await page.reload();
  await itemInCart.first().waitFor();
  expect((await itemInCart.all()).length).toBe(expectedAmountOfItemsInCart - 1);

  await removeItemFromCartBtn.first().click();
  await expect(itemInCart).not.toBeVisible();
});

test("STORE-008. Cart logo has indicator of items in cart", async ({
  page,
}) => {
  const itemOnHomePage = page.locator(".product-thumbnail img");

  const addToCartBtn = page.locator(".product-quantity .add");
  const closeModalBtn = page.locator("#blockcart-modal .close");
  const modalAfterAddingItem = page.locator("#blockcart-modal .modal-header");
  const neededItemOnItemPage = page.locator("#quantity_wanted");

  const cartItemsCounter = page.locator(".header .cart-products-count");

  let expectedCartCounterValue = 1;

  await page.goto("https://teststore.automationtesting.co.uk");
  await itemOnHomePage.first().waitFor();
  await itemOnHomePage.first().click();

  await addToCartBtn.waitFor({ state: "visible" });

  const waitForModalResponse1 = page.waitForResponse((response) =>
    response.url().includes("controller")
  );

  await addToCartBtn.click();
  await waitForModalResponse1;

  await modalAfterAddingItem.waitFor({ state: "attached" });

  await closeModalBtn.click();

  expect(await cartItemsCounter.innerText()).toContain(
    `${expectedCartCounterValue}`
  );

  await neededItemOnItemPage.waitFor();
  await neededItemOnItemPage.fill("3");

  await addToCartBtn.click();

  await modalAfterAddingItem.waitFor();
  await closeModalBtn.click();

  expectedCartCounterValue += 3;

  // await page.reload();
  await expect(cartItemsCounter).toBeVisible();
  expect(await cartItemsCounter.innerText()).toContain(
    `${expectedCartCounterValue}`
  );
});

async function fillOrderForm(page, orderData: Record<string, string>) {
  if (orderData) {
    for (const [key, value] of Object.entries(orderData)) {
      if (value === "true") {
        await page.getByLabel(key).click();
        continue;
      }
      if (key === "testTitle" || value === "false") {
        continue;
      }
      if (key === "State") {
        await page.getByLabel(key).selectOption(value);
        continue;
      }
      if (key === "Address") {
        await page.locator("#field-address1").click();
        await page.locator("#field-address1").fill(value);
        continue;
      }

      await page.getByLabel(key).click();
      await page.getByLabel(key).fill(value);
    }
  }
}

for (let inputData of testData) {
  test(`STORE-009:User registration with ${inputData.testTitle} registration data`, async ({
    page,
  }) => {
    // const signInLink = page.locator(".user-info a");
    const signInLink = page.locator(".user-info .hidden-sm-down");
    const createAccLink = page.locator(".no-account a");
    const saveUserBtn = page.locator('[data-link-action="save-customer"]');
    const accNameWhenLogin = page.locator("#_desktop_user_info");

    await page.goto("https://teststore.automationtesting.co.uk");

    await signInLink.waitFor();
    await signInLink.click();

    await createAccLink.waitFor();
    await createAccLink.click();

    await fillOrderForm(page, inputData);
    const waitForModalResponse1 = page.waitForResponse((response) =>
      response.url().includes("module=blockwishlist&controller=action")
    );
    await saveUserBtn.click();
    await waitForModalResponse1;
    const accNameee = page.locator('[title="View my customer account"]');
    await expect(accNameee).toBeVisible({ timeout: 10_000 });

    await expect(accNameWhenLogin).toContainText(inputData["First name"]);
    if (inputData["Last name"].length > 3) {
      await expect(accNameWhenLogin).toContainText(inputData["Last name"]);
    }
  });
}

loginUser("STORE-010: Order item", async ({ shopPages }) => {
  const proceedToCheckoutBtn = shopPages.page.locator(".checkout .btn");

  const itemOnHomePage = shopPages.page.locator(".product-thumbnail img");

  const addToCartBtn = shopPages.page.locator(".product-quantity .add");

  const modalAfterAddingItem = shopPages.page.locator(
    "#blockcart-modal .modal-header"
  );
  const closeModalBtn = shopPages.page.locator("#blockcart-modal .close");
  const cartBtn = shopPages.page.locator("#_desktop_cart");

  const continueBtn = shopPages.page.locator("#delivery-address .continue.btn");

  await shopPages.page.goto("https://teststore.automationtesting.co.uk");
  await itemOnHomePage.first().waitFor();
  await itemOnHomePage.first().click();
  await addToCartBtn.waitFor();

  await shopPages.page.reload();
  const waitForModalResponse1 = shopPages.page.waitForResponse((response) =>
    response.url().includes("controller")
  );

  await addToCartBtn.click();
  const response1 = await waitForModalResponse1;
  await modalAfterAddingItem.waitFor({ state: "visible" });
  await closeModalBtn.click();
  await cartBtn.click();

  await shopPages.page
    .locator(".cart-overview.js-cart")
    .waitFor({ state: "visible" });

  await proceedToCheckoutBtn.click();

  const orderInfo = {
    Address: "ul Lili 12",
    City: "Chichi",
    Zip: "01123",
    State: "Hawaii",
  };

  await fillOrderForm(shopPages.page, orderInfo);
  await continueBtn.click();
});

// test("Check login", async ({ browser }) => {
//   const requestContext = await request.newContext();
//   await requestContext.post(
//     "https://teststore.automationtesting.co.uk/index.php?controller=authentication?back=https%3A%2F%2Fteststore.automationtesting.co.uk%2Findex.php%3Fcontroller%3Dcontact",
//     {
//       form: {
//         back: "my-account",
//         email: "sdsds@com.com",
//         password: "sdasdasdasdas2",
//         submitLogin: 1,
//       },
//     }
//   );

//   const savedStorageState = await requestContext.storageState();

//   const context = await browser.newContext({ storageState: savedStorageState });
//   const page = await context.newPage();

//   await page.goto("https://teststore.automationtesting.co.uk/");
// });

// test("Check register", async ({ browser }) => {
//   const requestContext = await request.newContext();
//   await requestContext.post(
//     "https://teststore.automationtesting.co.uk/index.php?controller=registration",
//     {
//       form: {
//         firstname: "Super",
//         lastname: "Mommy",
//         email: "superDadysadas1@who.com",
//         password: "Qwerty123!",
//         psgdpr: 1,
//         submitCreate: 1,
//       },
//     }
//   );

//   const savedStorageState = await requestContext.storageState();

//   const context = await browser.newContext({ storageState: savedStorageState });
//   const page = await context.newPage();

//   await page.goto("https://teststore.automationtesting.co.uk/");
// });
