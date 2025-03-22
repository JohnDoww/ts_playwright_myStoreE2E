import { Page } from "@playwright/test";
import { Loader } from "../components/Loader.component";
import { FunctionHelpers } from "../../utils/helpers/FunctionHelpers";
import { step } from "../../utils/helpers/stepDecorator";

export abstract class BasePage {
  protected page: Page;
  protected helper: FunctionHelpers;
  private loader: Loader;

  abstract goTo(): void;

  constructor(page: Page) {
    this.page = page;
    this.helper = new FunctionHelpers(page);
    this.loader = new Loader(page);
  }

  @step("Handle the loader")
  async loaderHandler() {
    await this.loader.becomeHidden();
  }
}
