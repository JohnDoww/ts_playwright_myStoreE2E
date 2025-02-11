import { Page } from "@playwright/test";
import { step } from "../../utils/helpers/stepDecorator";
import { LoginFormComponent } from "../components/LoginFormComponent";
export class LoginPage {
  protected page: Page;
  protected loginFormComp: LoginFormComponent;

  constructor(page: Page) {
    this.page = page;
    this.loginFormComp = new LoginFormComponent(page);
  }

  @step("Open registration form")
  async followToRegForm() {
    await this.loginFormComp.clickOnNoAccount();
  }
}
