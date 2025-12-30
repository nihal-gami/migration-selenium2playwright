import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login-page';
import ConfigReader from '../src/utils/config';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ConfigReader.getBaseUrl());
  });

  test('Verify successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Verify login page is displayed
    await expect(loginPage.isLoginPageDisplayed()).resolves.toBe(true);
    
    // Perform login
    const dashboardPage = await loginPage.login(
      ConfigReader.getUsername(),
      ConfigReader.getPassword()
    );
    
    // Verify dashboard is displayed after login
    await expect(dashboardPage.isDashboardDisplayed()).resolves.toBe(true);
    await expect(dashboardPage.getDashboardTitle()).resolves.toBe('Dashboard');
  });

  test('Verify login fails with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Attempt login with invalid credentials
    await loginPage.enterUsername('invalidUser');
    await loginPage.enterPassword('invalidPass');
    await loginPage.clickLoginButton();
    
    // Verify error message is displayed
    await expect(loginPage.isErrorMessageDisplayed()).resolves.toBe(true);
  });

  test('Verify login fails with empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Attempt login with empty username
    await loginPage.enterPassword(ConfigReader.getPassword());
    await loginPage.clickLoginButton();
    
    // Verify error message or validation is displayed
    // Note: Actual behavior may vary based on HTML5 validation
    await expect(loginPage.isLoginPageDisplayed()).resolves.toBe(true);
  });

  test('Verify login fails with empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Attempt login with empty password
    await loginPage.enterUsername(ConfigReader.getUsername());
    await loginPage.clickLoginButton();
    
    // Verify error message or validation is displayed
    await expect(loginPage.isLoginPageDisplayed()).resolves.toBe(true);
  });
});

