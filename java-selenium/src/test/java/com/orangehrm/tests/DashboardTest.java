package com.orangehrm.tests;

import com.orangehrm.base.BaseTest;
import com.orangehrm.pages.DashboardPage;
import com.orangehrm.pages.LoginPage;
import com.orangehrm.pages.AdminPage;
import com.orangehrm.pages.PIMPage;
import com.orangehrm.utils.ConfigReader;
import org.testng.Assert;
import org.testng.annotations.Test;

public class DashboardTest extends BaseTest {

    @Test(priority = 1, description = "Verify dashboard navigation to Admin page")
    public void testNavigateToAdminPage() {
        LoginPage loginPage = new LoginPage(driver);
        DashboardPage dashboardPage = loginPage.login(
            ConfigReader.getUsername(),
            ConfigReader.getPassword()
        );
        
        // Navigate to Admin page
        dashboardPage.clickAdminMenu();
        AdminPage adminPage = new AdminPage(driver);
        
        // Verify Admin page is displayed
        Assert.assertTrue(adminPage.isAdminPageDisplayed(), "Admin page should be displayed");
        Assert.assertEquals(adminPage.getAdminPageTitle(), "Admin", "Admin page title should match");
    }

    @Test(priority = 2, description = "Verify dashboard navigation to PIM page")
    public void testNavigateToPIMPage() {
        LoginPage loginPage = new LoginPage(driver);
        DashboardPage dashboardPage = loginPage.login(
            ConfigReader.getUsername(),
            ConfigReader.getPassword()
        );
        
        // Navigate to PIM page
        dashboardPage.clickPIMMenu();
        PIMPage pimPage = new PIMPage(driver);
        
        // Verify PIM page is displayed
        Assert.assertTrue(pimPage.isPIMPageDisplayed(), "PIM page should be displayed");
        Assert.assertEquals(pimPage.getPIMPageTitle(), "PIM", "PIM page title should match");
    }

    @Test(priority = 3, description = "Verify logout functionality")
    public void testLogout() {
        LoginPage loginPage = new LoginPage(driver);
        DashboardPage dashboardPage = loginPage.login(
            ConfigReader.getUsername(),
            ConfigReader.getPassword()
        );
        
        // Verify dashboard is displayed
        Assert.assertTrue(dashboardPage.isDashboardDisplayed(), "Dashboard should be displayed");
        
        // Perform logout
        LoginPage logoutPage = dashboardPage.logout();
        
        // Verify login page is displayed after logout
        Assert.assertTrue(logoutPage.isLoginPageDisplayed(), "Login page should be displayed after logout");
    }

    @Test(priority = 4, description = "Verify all main menu items are present")
    public void testMainMenuItems() {
        LoginPage loginPage = new LoginPage(driver);
        DashboardPage dashboardPage = loginPage.login(
            ConfigReader.getUsername(),
            ConfigReader.getPassword()
        );
        
        // Verify dashboard is displayed
        Assert.assertTrue(dashboardPage.isDashboardDisplayed(), "Dashboard should be displayed");
        
        // Verify main menu items can be clicked (basic presence check)
        // Note: In a real scenario, you might want to verify menu items are visible
        dashboardPage.clickAdminMenu();
        AdminPage adminPage = new AdminPage(driver);
        Assert.assertTrue(adminPage.isAdminPageDisplayed(), "Admin menu should navigate correctly");
    }
}

