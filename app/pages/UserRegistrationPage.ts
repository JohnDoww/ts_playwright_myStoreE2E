import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";
import { step } from "../../utils/helpers/stepDecorator";
import { FunctionHelpers } from "../../utils/helpers/FunctionHelpers";
import { LoginForm } from "../components/LoginForm.component";
import { RegistrationForm } from "../components/RegistrationForm.component";
import { UserIndicator } from "../components/UserIndicator.component";

export class UserRegistrationPage {
  private page: Page;
  private logFormComp: LoginForm;
  private regFormComp: RegistrationForm;
  private userIndicatorComp: UserIndicator;
  private helper: FunctionHelpers;
  private homePage: HomePage;
  private partOfRequestAfterFormSubmit: string = "controller=action";

  constructor(page: Page) {
    this.page = page;
    this.logFormComp = new LoginForm(page);
    this.regFormComp = new RegistrationForm(page);
    this.userIndicatorComp = new UserIndicator(page);
    this.helper = new FunctionHelpers(page);
    this.homePage = new HomePage(page);
  }

  @step("Open user registration page")
  async openNewUserRegistrationPage() {
    await this.homePage.clickSignInLink();
    await this.logFormComp.clickOnNoAccount();
    await this.page.waitForLoadState();
  }

  @step("Pass registration form")
  async fillRegistrationForm(regData: {}) {
    await this.helper.fillForm(regData);
  }

  @step("Submit registration form")
  async submitRegistrationForm() {
    const waitForModalResponse1 = this.helper.responseWaiter(
      this.partOfRequestAfterFormSubmit
    );
    await this.regFormComp.clickSaveNewUserBtn();
    await waitForModalResponse1;
  }

  @step("Get user indicator text")
  async getTextOfUserIndicator() {
    await this.userIndicatorComp.profileLink.waitFor();
    return await this.userIndicatorComp.profileLink.innerText();
  }
}
