import { faker } from "@faker-js/faker";

export default {
  getNewEmail() {
    return faker.internet.email();
  },

  getShippingInfo() {
    return {
      Address: "Good str. 12",
      City: "Chichi",
      Zip: "01123",
      State: "Hawaii"
    };
  }
};
