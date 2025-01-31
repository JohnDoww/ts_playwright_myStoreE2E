import { test, expect, request, APIRequestContext } from "@playwright/test";

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

test("Check login", async ({ browser }) => {
  const requestContext = await request.newContext();
  await requestContext.post(
    "https://teststore.automationtesting.co.uk/index.php?controller=authentication?back=https%3A%2F%2Fteststore.automationtesting.co.uk%2Findex.php%3Fcontroller%3Dcontact",
    {
      form: {
        back: "my-account",
        email: "sdsds@com.com",
        password: "sdasdasdasdas2",
        submitLogin: 1,
      },
    }
  );

  const savedStorageState = await requestContext.storageState();

  const context = await browser.newContext({ storageState: savedStorageState });
  const page = await context.newPage();

  await page.goto("https://teststore.automationtesting.co.uk/");
});

test("Check register", async ({ browser }) => {
  const requestContext = await request.newContext();
  await requestContext.post(
    "https://teststore.automationtesting.co.uk/index.php?controller=registration",
    {
      form: {
        firstname: "Super",
        lastname: "Mommy",
        email: "superDady1@who.com",
        password: "Qwerty123!",
        psgdpr: 1,
        submitCreate: 1,
      },
    }
  );

  const savedStorageState = await requestContext.storageState();

  const context = await browser.newContext({ storageState: savedStorageState });
  const page = await context.newPage();

  await page.goto("https://teststore.automationtesting.co.uk/");
});
