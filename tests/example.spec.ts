import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  const catalogItems = page.locator('.catalog-grid__cell').all();
  const searchInput = page.locator('input.search-form__input ');

  const submitSearchBtn = page.locator('button.search-form__submit');

  const searchRequest = 'iPhone';
  
  await page.goto('https://rozetka.com.ua/ua/');
await searchInput.fill(searchRequest);
await submitSearchBtn.click();

  for(let item in catalogItems){
    expect(page.locator(item)).toContainText(searchRequest);
  }
  

  
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
