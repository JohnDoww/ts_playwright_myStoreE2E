import { test, request } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import dataGenerator from "../utils/testData/dataGenerator";

type ShopPages = {
  shopPages: BasePage;
};

export const loginUser = test.extend<ShopPages>({
  shopPages: async ({ browser }, use) => {
    //convert to method
    const requestContext = await request.newContext();
    await requestContext.post(
      "https://teststore.automationtesting.co.uk/index.php?controller=registration",

      {
        form: {
          firstname: "Test",
          lastname: "User",
          email: dataGenerator.getNewEmail(),
          password: "Qwerty123!",
          psgdpr: 1,
          submitCreate: 1,
        },
      }
    );

    const savedStorageState = await requestContext.storageState();

    const context = await browser.newContext({
      storageState: savedStorageState,
    });
    const page = await context.newPage();
    const testMart = new BasePage(page);
    await use(testMart);
  },
});
