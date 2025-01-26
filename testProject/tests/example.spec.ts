import { test, expect } from "@playwright/test";

test("STORE-001: Search word contains into search result items", async ({ page }) => {
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

test("STORE-002: Filter amount display right amount of items", async ({ page }) => {
  const catalogItem = page.locator(".product-description");
  const compositionFilterSection = page.locator(
    '//*[contains(text(), "Composition")]//following-sibling::ul//li'
  );
  const loader = page.locator('.spinner'); 

  await page.goto(
    "https://teststore.automationtesting.co.uk/index.php?id_category=2&controller=category"
  );

  for (const element of await compositionFilterSection.all()) {
    await element.waitFor({state:'visible'});
    await element.click();
    const productsAmountOnFilter = await element.locator("//a//span").innerText();
    const numn = productsAmountOnFilter.match(/(\d+)/);
    let value =0;
    if(Array.isArray(numn)){
      value = parseInt(numn[0]);
    }

    if(await loader.isVisible()){
      console.log('loader was detected');
      await loader.waitFor({state:'hidden'});
    }

    const exactAmounOfProducts = await catalogItem.all();

    expect(value).toBe(exactAmounOfProducts.length);

    await element.click();
  }
});
