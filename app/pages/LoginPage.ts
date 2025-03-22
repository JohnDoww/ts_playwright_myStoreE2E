import { Page } from "@playwright/test";
import { step } from "../../utils/helpers/stepDecorator";
import { LoginForm } from "../components/LoginForm.component";
import { BasePage } from "./BasePage.abstract";
export class LoginPage extends BasePage {
  protected loginFormComp: LoginForm;
  private url: string = "/controller=authentication?back=https%3A%2F%2";

  constructor(page: Page) {
    super(page);
    this.loginFormComp = new LoginForm(page);
  }

  @step("Open login page")
  async goTo() {
    await this.page.goto(this.url);
  }

  @step("Follow to registration form")
  async followToRegForm() {
    await this.loginFormComp.clickOnNoAccount();
  }
}
