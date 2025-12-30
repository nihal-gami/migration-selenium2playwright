import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/base-page';

export class AdminPage extends BasePage {
  private readonly adminPageTitle: Locator;
  private readonly addButton: Locator;
  private readonly searchField: Locator;
  private readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.adminPageTitle = page.locator('h6:has-text("Admin")');
    this.addButton = page.locator('button:has-text("Add")');
    this.searchField = page.getByPlaceholder('Type for hints...');
    this.searchButton = page.locator('button[type="submit"]');
  }

  async isAdminPageDisplayed(): Promise<boolean> {
    return await this.isDisplayed(this.adminPageTitle);
  }

  async getAdminPageTitle(): Promise<string> {
    return await this.getText(this.adminPageTitle);
  }

  async clickAddButton(): Promise<void> {
    await this.click(this.addButton);
  }

  async searchUser(username: string): Promise<void> {
    await this.fill(this.searchField, username);
    await this.click(this.searchButton);
  }
}


