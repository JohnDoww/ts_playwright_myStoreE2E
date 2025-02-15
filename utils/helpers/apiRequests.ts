import { request } from "@playwright/test";
import dataGenerator from "../testData/dataGenerator";

const endpoints = {
  userRegistrationUrl:
    "https://teststore.automationtesting.co.uk/index.php?controller=registration",
};

export async function getNewRegUserStorageState(
  userEmail = dataGenerator.getNewEmail()
) {
  const requestContext = await request.newContext();
  await requestContext.post(endpoints.userRegistrationUrl, {
    form: {
      firstname: "Test",
      lastname: "User",
      email: userEmail,
      password: "Qwerty123!",
      psgdpr: 1,
      submitCreate: 1,
    },
  });
  return await requestContext.storageState();
}
