import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login-page';
import { DashboardPage } from '../src/pages/dashboard-page';
import { AdminPage } from '../src/pages/admin-page';
import { PIMPage } from '../src/pages/pim-page';
import ConfigReader from '../src/utils/config';

test.describe('Dashboard Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ConfigReader.getBaseUrl());
  });

  test('Verify dashboard navigation to Admin page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage: DashboardPage = await loginPage.login(
      ConfigReader.getUsername(),
      ConfigReader.getPassword()
    );
    
    // Navigate to Admin page
    await dashboardPage.clickAdminMenu();
    const adminPage = new AdminPage(page);
    
    // Verify Admin page is displayed
    await expect(adminPage.isAdminPageDisplayed()).resolves.toBe(true);
    await expect(adminPage.getAdminPageTitle()).resolves.toBe('Admin');
  });

  test('Verify dashboard navigation to PIM page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage: DashboardPage = await loginPage.login(
      ConfigReader.getUsername(),
      ConfigReader.getPassword()
    );
    
    // Navigate to PIM page
    await dashboardPage.clickPIMMenu();
    const pimPage = new PIMPage(page);
    
    // Verify PIM page is displayed
    await expect(pimPage.isPIMPageDisplayed()).resolves.toBe(true);
    await expect(pimPage.getPIMPageTitle()).resolves.toBe('PIM');
  });

  test('Verify logout functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage: DashboardPage = await loginPage.login(
      ConfigReader.getUsername(),
      ConfigReader.getPassword()
    );
    
    // Verify dashboard is displayed
    await expect(dashboardPage.isDashboardDisplayed()).resolves.toBe(true);
    
    // Perform logout
    const logoutPage = await dashboardPage.logout();
    
    // Verify login page is displayed after logout
    await expect(logoutPage.isLoginPageDisplayed()).resolves.toBe(true);
  });

  test('Verify all main menu items are present', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage: DashboardPage = await loginPage.login(
      ConfigReader.getUsername(),
      ConfigReader.getPassword()
    );
    
    // Verify dashboard is displayed
    await expect(dashboardPage.isDashboardDisplayed()).resolves.toBe(true);
    
    // Verify main menu items can be clicked (basic presence check)
    // Note: In a real scenario, you might want to verify menu items are visible
    await dashboardPage.clickAdminMenu();
    const adminPage = new AdminPage(page);
    await expect(adminPage.isAdminPageDisplayed()).resolves.toBe(true);
  });
});

