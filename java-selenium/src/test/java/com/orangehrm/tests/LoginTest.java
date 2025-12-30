package com.orangehrm.tests;

import com.orangehrm.base.BaseTest;
import com.orangehrm.pages.DashboardPage;
import com.orangehrm.pages.LoginPage;
import com.orangehrm.utils.ConfigReader;
import org.testng.Assert;
import org.testng.annotations.Test;

public class LoginTest extends BaseTest {

    @Test(priority = 1, description = "Verify successful login with valid credentials")
    public void testSuccessfulLogin() {
        LoginPage loginPage = new LoginPage(driver);
        
        // Verify login page is displayed
        Assert.assertTrue(loginPage.isLoginPageDisplayed(), "Login page should be displayed");
        
        // Perform login
        DashboardPage dashboardPage = loginPage.login(
            ConfigReader.getUsername(),
            ConfigReader.getPassword()
        );
        
        // Verify dashboard is displayed after login
        Assert.assertTrue(dashboardPage.isDashboardDisplayed(), "Dashboard should be displayed after successful login");
        Assert.assertEquals(dashboardPage.getDashboardTitle(), "Dashboard", "Dashboard title should match");
    }

    @Test(priority = 2, description = "Verify login fails with invalid credentials")
    public void testInvalidLogin() {
        LoginPage loginPage = new LoginPage(driver);
        
        // Attempt login with invalid credentials
        loginPage.enterUsername("invalidUser");
        loginPage.enterPassword("invalidPass");
        loginPage.clickLoginButton();
        
        // Verify error message is displayed
        Assert.assertTrue(loginPage.isErrorMessageDisplayed(), "Error message should be displayed for invalid credentials");
    }

    @Test(priority = 3, description = "Verify login fails with empty username")
    public void testLoginWithEmptyUsername() {
        LoginPage loginPage = new LoginPage(driver);
        
        // Attempt login with empty username
        loginPage.enterPassword(ConfigReader.getPassword());
        loginPage.clickLoginButton();
        
        // Verify error message or validation is displayed
        // Note: Actual behavior may vary based on HTML5 validation
        Assert.assertTrue(loginPage.isLoginPageDisplayed(), "Should remain on login page");
    }

    @Test(priority = 4, description = "Verify login fails with empty password")
    public void testLoginWithEmptyPassword() {
        LoginPage loginPage = new LoginPage(driver);
        
        // Attempt login with empty password
        loginPage.enterUsername(ConfigReader.getUsername());
        loginPage.clickLoginButton();
        
        // Verify error message or validation is displayed
        Assert.assertTrue(loginPage.isLoginPageDisplayed(), "Should remain on login page");
    }
}

