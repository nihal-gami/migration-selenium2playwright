import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/base-page';

export class PIMPage extends BasePage {
  private readonly pimPageTitle: Locator;
  private readonly addEmployeeButton: Locator;
  private readonly employeeNameSearchField: Locator;
  private readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pimPageTitle = page.locator('h6:has-text("PIM")');
    this.addEmployeeButton = page.locator('button:has-text("Add")');
    this.employeeNameSearchField = page.getByPlaceholder('Type for hints...');
    this.searchButton = page.locator('button[type="submit"]');
  }

  async isPIMPageDisplayed(): Promise<boolean> {
    return await this.isDisplayed(this.pimPageTitle);
  }

  async getPIMPageTitle(): Promise<string> {
    return await this.getText(this.pimPageTitle);
  }

  async clickAddEmployeeButton(): Promise<void> {
    await this.click(this.addEmployeeButton);
  }

  async searchEmployee(employeeName: string): Promise<void> {
    await this.fill(this.employeeNameSearchField, employeeName);
    await this.click(this.searchButton);
  }
}


