package com.orangehrm.tests;

import com.orangehrm.base.BaseTest;
import com.orangehrm.pages.AdminPage;
import com.orangehrm.pages.DashboardPage;
import com.orangehrm.pages.LoginPage;
import com.orangehrm.utils.ConfigReader;
import org.testng.Assert;
import org.testng.annotations.Test;

public class AdminPageTest extends BaseTest {

    @Test(priority = 1, description = "Verify Admin page loads successfully")
    public void testAdminPageLoads() {
        LoginPage loginPage = new LoginPage(driver);
        DashboardPage dashboardPage = loginPage.login(
            ConfigReader.getUsername(),
            ConfigReader.getPassword()
        );
        
        dashboardPage.clickAdminMenu();
        AdminPage adminPage = new AdminPage(driver);
        
        Assert.assertTrue(adminPage.isAdminPageDisplayed(), "Admin page should be displayed");
    }

    @Test(priority = 2, description = "Verify Add button is present on Admin page")
    public void testAddButtonPresent() {
        LoginPage loginPage = new LoginPage(driver);
        DashboardPage dashboardPage = loginPage.login(
            ConfigReader.getUsername(),
            ConfigReader.getPassword()
        );
        
        dashboardPage.clickAdminMenu();
        AdminPage adminPage = new AdminPage(driver);
        
        // Verify Add button exists (clickable check)
        try {
            adminPage.clickAddButton();
            // If we reach here, button was clickable
            Assert.assertTrue(true, "Add button should be present and clickable");
        } catch (Exception e) {
            Assert.fail("Add button should be present on Admin page");
        }
    }
}

