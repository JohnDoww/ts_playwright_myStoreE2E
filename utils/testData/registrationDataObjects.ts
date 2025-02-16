import dataGenerator from "./dataGenerator";
export const regData = [
  {
    testTitle: "MIN",
    "I agree to": "true",
    "Receive offers": "false",
    "Sign up for our newsletter": "false",
    "Mr.": "false",
    "First name": "Loli",
    "Last name": "Gogo",
    Email: `${dataGenerator.getNewEmail()}`,
    Password: "dindindon123!",
    Birthdate: "false"
  },

  {
    testTitle: "MAX",
    "I agree to": "true",
    "Receive offers": "true",
    "Sign up for our newsletter": "true",
    "Mr.": "true",
    "First name": "Hopa",
    "Last name": "Naaaaa",
    Email: `${dataGenerator.getNewEmail()}`,
    Password: "dindindon123!",
    Birthdate: "05/31/1970"
  }
];
