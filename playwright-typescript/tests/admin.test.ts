import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login-page';
import { DashboardPage } from '../src/pages/dashboard-page';
import { AdminPage } from '../src/pages/admin-page';
import ConfigReader from '../src/utils/config';

test.describe('Admin Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ConfigReader.getBaseUrl());
  });

  test('Verify Admin page loads successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage: DashboardPage = await loginPage.login(
      ConfigReader.getUsername(),
      ConfigReader.getPassword()
    );
    
    await dashboardPage.clickAdminMenu();
    const adminPage = new AdminPage(page);
    
    await expect(adminPage.isAdminPageDisplayed()).resolves.toBe(true);
  });

  test('Verify Add button is present on Admin page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage: DashboardPage = await loginPage.login(
      ConfigReader.getUsername(),
      ConfigReader.getPassword()
    );
    
    await dashboardPage.clickAdminMenu();
    const adminPage = new AdminPage(page);
    
    // Verify Add button exists (clickable check)
    try {
      await adminPage.clickAddButton();
      // If we reach here, button was clickable
      expect(true).toBe(true);
    } catch (error) {
      throw new Error('Add button should be present on Admin page');
    }
  });
});

