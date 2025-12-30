import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/base-page';
import { DashboardPage } from './dashboard-page';

export class LoginPage extends BasePage {
  private readonly usernameField: Locator;
  private readonly passwordField: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly loginPageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('div[role="alert"]');
    this.loginPageTitle = page.locator('h5:has-text("Login")');
  }

  async enterUsername(username: string): Promise<void> {
    await this.fill(this.usernameField, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.fill(this.passwordField, password);
  }

  async clickLoginButton(): Promise<void> {
    await this.click(this.loginButton);
  }

  async login(username: string, password: string): Promise<DashboardPage> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    return new DashboardPage(this.page);
  }

  async isLoginPageDisplayed(): Promise<boolean> {
    return await this.isDisplayed(this.loginPageTitle);
  }

  async getErrorMessage(): Promise<string> {
    await this.waitForElement(this.errorMessage);
    return await this.getText(this.errorMessage);
  }

  async isErrorMessageDisplayed(): Promise<boolean> {
    return await this.isDisplayed(this.errorMessage);
  }
}

