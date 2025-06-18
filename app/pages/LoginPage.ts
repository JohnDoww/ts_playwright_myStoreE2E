import { step } from "../../utils/helpers/stepDecorator";
import { LoginForm } from "../components/LoginForm.component";
import { BasePage } from "./BasePage.abstract";
export class LoginPage extends BasePage {
  protected loginFormComp: LoginForm = new LoginForm(this.page);
  private url: string = "/controller=authentication?back=https%3A%2F%2";

  @step("Open login page")
  async goTo() {
    await this.page.goto(this.url);
  }

  @step("Follow to registration form")
  async followToRegForm() {
    await this.loginFormComp.clickOnNoAccount();
  }
}
