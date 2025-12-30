import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/base-page';
import { LoginPage } from './login-page';

export class DashboardPage extends BasePage {
  private readonly dashboardTitle: Locator;
  private readonly adminMenu: Locator;
  private readonly pimMenu: Locator;
  private readonly leaveMenu: Locator;
  private readonly timeMenu: Locator;
  private readonly recruitmentMenu: Locator;
  private readonly userDropdown: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.dashboardTitle = page.locator('h6:has-text("Dashboard")');
    this.adminMenu = page.locator('span:has-text("Admin")');
    this.pimMenu = page.locator('span:has-text("PIM")');
    this.leaveMenu = page.locator('span:has-text("Leave")');
    this.timeMenu = page.locator('span:has-text("Time")');
    this.recruitmentMenu = page.locator('span:has-text("Recruitment")');
    this.userDropdown = page.locator('span.oxd-userdropdown-tab');
    this.logoutLink = page.locator('a:has-text("Logout")');
  }

  async isDashboardDisplayed(): Promise<boolean> {
    return await this.isDisplayed(this.dashboardTitle);
  }

  async getDashboardTitle(): Promise<string> {
    return await this.getText(this.dashboardTitle);
  }

  async clickAdminMenu(): Promise<void> {
    await this.click(this.adminMenu);
  }

  async clickPIMMenu(): Promise<void> {
    await this.click(this.pimMenu);
  }

  async clickLeaveMenu(): Promise<void> {
    await this.click(this.leaveMenu);
  }

  async clickTimeMenu(): Promise<void> {
    await this.click(this.timeMenu);
  }

  async clickRecruitmentMenu(): Promise<void> {
    await this.click(this.recruitmentMenu);
  }

  async logout(): Promise<LoginPage> {
    await this.click(this.userDropdown);
    await this.waitForElement(this.logoutLink);
    await this.click(this.logoutLink);
    return new LoginPage(this.page);
  }
}


