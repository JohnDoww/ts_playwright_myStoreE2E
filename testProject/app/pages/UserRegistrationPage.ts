import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { step } from "../../utils/helpers/stepDecorator";
import { FunctionHelpers } from "../../utils/helpers/FunctionHelpers";
import { ComponentsHolder } from "../ComponentsHolder";

export class UserRegistrationPage {
  private page: Page;
  private helper: FunctionHelpers;
  private compHold: ComponentsHolder;
  private basePage: BasePage;
  private partOfRequestAfterFormSubmit: string = "controller=action";

  constructor(page: Page) {
    this.page = page;
    this.helper = new FunctionHelpers(page);
    this.compHold = new ComponentsHolder(page);
    this.basePage = new BasePage(page);
  }

  @step("Open user registration page")
  async openNewUserRegistrationPage() {
    await this.basePage.clickSignInLink();
    await this.compHold.logForm.clickOnNoAccount();
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
    await this.compHold.regForm.clickSaveNewUserBtn();
    await waitForModalResponse1;
  }

  @step("Get user indicator text")
  async getTextOfUserIndicator() {
    await this.compHold.userIndicator.profileLink.waitFor();
    return await this.compHold.userIndicator.profileLink.innerText();
  }
}
