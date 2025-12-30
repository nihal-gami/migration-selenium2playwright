import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;
  protected readonly defaultTimeout: number = 10000;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Click on an element after ensuring it's clickable
   */
  protected async click(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await locator.click();
  }

  /**
   * Fill input field after ensuring it's visible
   */
  protected async fill(locator: Locator, text: string): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await locator.clear();
    await locator.fill(text);
  }

  /**
   * Get text content from an element
   */
  protected async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    const text = await locator.textContent();
    return text?.trim() || '';
  }

  /**
   * Check if element is displayed
   */
  protected async isDisplayed(locator: Locator): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout: this.defaultTimeout });
      return await locator.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Wait for element to be visible
   */
  protected async waitForElement(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: timeout || this.defaultTimeout });
  }

  /**
   * Navigate to a URL
   */
  protected async navigateTo(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  /**
   * Get page title
   */
  protected async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Wait for page to load
   */
  protected async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
}

