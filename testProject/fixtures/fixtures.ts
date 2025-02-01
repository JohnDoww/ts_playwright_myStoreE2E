import { test, request } from "@playwright/test";
import { BasePage } from "../pages/BasePage";

type ShopPages = {
  shopPages: BasePage;
};

export const loginUser = test.extend<ShopPages>({
  shopPages: async ({ browser }, use) => {

    //conver to method
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

    const context = await browser.newContext({
      storageState: savedStorageState,
    });
    const page = await context.newPage();
    const testMart = new BasePage(page);

    await testMart.page.goto("https://teststore.automationtesting.co.uk/");

    await use(testMart);
  },
});
