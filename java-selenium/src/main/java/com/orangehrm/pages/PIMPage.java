package com.orangehrm.pages;

import com.orangehrm.base.BasePage;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class PIMPage extends BasePage {

    @FindBy(xpath = "//h6[text()='PIM']")
    private WebElement pimPageTitle;

    @FindBy(xpath = "//button[normalize-space()='Add']")
    private WebElement addEmployeeButton;

    @FindBy(xpath = "//input[@placeholder='Type for hints...']")
    private WebElement employeeNameSearchField;

    @FindBy(xpath = "//button[@type='submit']")
    private WebElement searchButton;

    public PIMPage(WebDriver driver) {
        super(driver);
    }

    public boolean isPIMPageDisplayed() {
        return isDisplayed(pimPageTitle);
    }

    public String getPIMPageTitle() {
        return getText(pimPageTitle);
    }

    public void clickAddEmployeeButton() {
        click(addEmployeeButton);
    }

    public void searchEmployee(String employeeName) {
        sendKeys(employeeNameSearchField, employeeName);
        click(searchButton);
    }
}

