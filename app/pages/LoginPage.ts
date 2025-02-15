import { Page } from "@playwright/test";
import { step } from "../../utils/helpers/stepDecorator";
import { LoginForm } from "../components/LoginForm.component";
export class LoginPage {
  protected page: Page;
  protected loginFormComp: LoginForm;

  constructor(page: Page) {
    this.page = page;
    this.loginFormComp = new LoginForm(page);
  }

  @step("Open registration form")
  async followToRegForm() {
    await this.loginFormComp.clickOnNoAccount();
  }
}
