package com.orangehrm.pages;

import com.orangehrm.base.BasePage;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class DashboardPage extends BasePage {

    @FindBy(xpath = "//h6[text()='Dashboard']")
    private WebElement dashboardTitle;

    @FindBy(xpath = "//span[text()='Admin']")
    private WebElement adminMenu;

    @FindBy(xpath = "//span[text()='PIM']")
    private WebElement pimMenu;

    @FindBy(xpath = "//span[text()='Leave']")
    private WebElement leaveMenu;

    @FindBy(xpath = "//span[text()='Time']")
    private WebElement timeMenu;

    @FindBy(xpath = "//span[text()='Recruitment']")
    private WebElement recruitmentMenu;

    @FindBy(xpath = "//span[@class='oxd-userdropdown-tab']")
    private WebElement userDropdown;

    @FindBy(xpath = "//a[text()='Logout']")
    private WebElement logoutLink;

    public DashboardPage(WebDriver driver) {
        super(driver);
    }

    public boolean isDashboardDisplayed() {
        return isDisplayed(dashboardTitle);
    }

    public String getDashboardTitle() {
        return getText(dashboardTitle);
    }

    public void clickAdminMenu() {
        click(adminMenu);
    }

    public void clickPIMMenu() {
        click(pimMenu);
    }

    public void clickLeaveMenu() {
        click(leaveMenu);
    }

    public void clickTimeMenu() {
        click(timeMenu);
    }

    public void clickRecruitmentMenu() {
        click(recruitmentMenu);
    }

    public LoginPage logout() {
        click(userDropdown);
        waitForElement(logoutLink);
        click(logoutLink);
        return new LoginPage(driver);
    }
}

