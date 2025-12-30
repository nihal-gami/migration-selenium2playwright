package com.orangehrm.pages;

import com.orangehrm.base.BasePage;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class AdminPage extends BasePage {

    @FindBy(xpath = "//h6[text()='Admin']")
    private WebElement adminPageTitle;

    @FindBy(xpath = "//button[normalize-space()='Add']")
    private WebElement addButton;

    @FindBy(xpath = "//input[@placeholder='Type for hints...']")
    private WebElement searchField;

    @FindBy(xpath = "//button[@type='submit']")
    private WebElement searchButton;

    public AdminPage(WebDriver driver) {
        super(driver);
    }

    public boolean isAdminPageDisplayed() {
        return isDisplayed(adminPageTitle);
    }

    public String getAdminPageTitle() {
        return getText(adminPageTitle);
    }

    public void clickAddButton() {
        click(addButton);
    }

    public void searchUser(String username) {
        sendKeys(searchField, username);
        click(searchButton);
    }
}

