import { faker } from "@faker-js/faker";
let userEmail = "";

export default {
  getNewEmail: () => {
    return faker.internet.email();
  },
};
