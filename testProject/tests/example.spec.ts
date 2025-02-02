import { test, expect, request } from "@playwright/test";
import { loginUser } from "../fixtures/fixtures";

test("STORE-001: Search word contains into search result items", async ({
  page,
}) => {
  const catalogItem = page.locator(".product-description");
  const searchInput = page.locator('[aria-label="Search"]');
  const searchRequest = "Mug";

  await page.goto("https://teststore.automationtesting.co.uk/index.php");

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
  const compositionFilterSection = page.locator(
    '//*[contains(text(), "Composition")]//following-sibling::ul//li'
  );
  const loader = page.locator(".spinner");

  await page.goto(
    "https://teststore.automationtesting.co.uk/index.php?id_category=2&controller=category"
  );

  for (const element of await compositionFilterSection.all()) {
    await element.waitFor({ state: "visible" });
    await element.click();
    const productsAmountOnFilter = await element
      .locator("//a//span")
      .innerText();
    const numn = productsAmountOnFilter.match(/(\d+)/);
    let value = 0;
    if (Array.isArray(numn)) {
      value = parseInt(numn[0]);
    }

    if (await loader.isVisible()) {
      await loader.waitFor({ state: "hidden" });
    }

    const exactAmounOfProducts = await catalogItem.all();

    expect(value).toBe(exactAmounOfProducts.length);

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

  await catalogItem.first().click();

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

  await itemOnHomePage.first().click();
  await page.reload();
  const waitForModalResponse1 = page.waitForResponse((response) =>
    response.url().includes("controller")
  );

  await addToCartBtn.click();
  await waitForModalResponse1;

  await modalAfterAddingItem.waitFor();

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

  await itemOnHomePage.first().click();
  await increaseAmountOfAddedItems.click();
  defaultAmountOfNeededItems += 1;

  await addToCartBtn.click();

  await modalAfterAddingItem.waitFor({ state: "visible" });

  await closeModalBtn.click();
  await cartBtn.click();

  const amountOfAddedItem = await amountOfAddedItemInCart.getAttribute("value");
  expect(amountOfAddedItem).toBe(`${defaultAmountOfNeededItems}`);

  await decreaseAmountOfAddedItems.click();
  defaultAmountOfNeededItems -= 1;
  const waitTillNeededResponse = page.waitForResponse(
    RegExp("^.*\\action=refresh\\b.*$")
  );
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
  await itemOnHomePage.first().click();
  await addToCartBtn.waitFor();

  await page.reload();
  const waitForModalResponse1 = page.waitForResponse((response) =>
    response.url().includes("controller")
  );

  await addToCartBtn.click();
  const response1 = await waitForModalResponse1;

  await modalAfterAddingItem.waitFor({ state: "visible" });
  await closeModalBtn.click();
  await page.goto("https://teststore.automationtesting.co.uk");

  await itemOnHomePage.last().click();
  const waitForModalResponse2 = page.waitForResponse((response) =>
    response.url().includes("fc=module&module=ps_shoppingcart&controller")
  );
  await addToCartBtn.click();
  const response2 = await waitForModalResponse2;

  await modalAfterAddingItem.waitFor({ state: "visible" });
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

  await itemOnHomePage.first().click();

  await page.reload();

  await addToCartBtn.waitFor({ state: "visible" });

  await addToCartBtn.click();

  await modalAfterAddingItem.waitFor({ state: "visible" });
  await closeModalBtn.click();

  expect(await cartItemsCounter.innerText()).toContain(
    `${expectedCartCounterValue}`
  );

  await neededItemOnItemPage.fill("3");

  await addToCartBtn.click();
  await closeModalBtn.click();
  expectedCartCounterValue += 3;

  await page.reload();

  expect(await cartItemsCounter.innerText()).toContain(
    `${expectedCartCounterValue}`
  );
});

// loginUser("Fixture check", async ({ shopPages }) => {
//   const proposedItemInSearch = shopPages.page.locator(".ui-menu-item");
//   const searchInput = shopPages.page.locator('[aria-label="Search"]');
//   const searchRequest = "frame ";

//   await searchInput.fill(searchRequest);

//   await proposedItemInSearch.first().waitFor({ state: "visible" });
// });

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
//         email: "superDady1@who.com",
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
