import { test, expect } from '@playwright/test';
import testData from '../../fixtures/testData2.json';
import { RegistrationPage } from '../../pageObjects/RegistrationPage';
import { LoginPage } from '../../pageObjects/LoginPage';
import { Locators } from '../../pageObjects/Locators';

test.describe('QAuto Registration and Login Tests', () => {
    let registrationPage: RegistrationPage;
    let loginPage: LoginPage;



    test.beforeEach(async ({ page }) => {
        registrationPage = new RegistrationPage(page);
        loginPage = new LoginPage(page);
        await page.goto('/');
    });


    test('Should validate "Name" field', async ({ page }) => {
        await registrationPage.clickSignUp();
        await page.locator(Locators.nameInput).focus();
        await page.click('body');
        await expect(page.locator(Locators.nameRequiredError)).toBeVisible();

        await registrationPage.fillName(testData.invalidUser.name);
        await expect(page.locator(Locators.nameInput)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('text=Name has to be from 2 to 20 characters long')).toBeVisible();

        await registrationPage.fillName(testData.validUser.name);
        await expect(page.locator(Locators.nameRequiredError)).not.toBeVisible();
    });

    test('Should validate "Last Name" field', async ({ page }) => {
        await registrationPage.clickSignUp();
        await page.locator(Locators.lastNameInput).focus();
        await page.click('body');
        await expect(page.locator(Locators.lastNameRequiredError)).toBeVisible();

        await registrationPage.fillLastName(testData.invalidUser.lastName);
        await expect(page.locator(Locators.lastNameInput)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('text=Last name has to be from 2 to 20 characters long')).toBeVisible();

        await registrationPage.fillLastName(testData.validUser.lastName);
        await expect(page.locator(Locators.lastNameRequiredError)).not.toBeVisible();
    });

    test('Should validate "Email" field', async ({ page }) => {
        await registrationPage.clickSignUp();
        await page.locator(Locators.emailInput).focus();
        await page.click(Locators.lastNameInput); // Щоб зняти фокус
        await expect(page.locator(Locators.emailRequiredError)).toBeVisible();

        await registrationPage.fillEmail(testData.invalidUser.email);
        await expect(page.locator(Locators.emailInput)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(Locators.emailError)).toBeVisible();

        await registrationPage.fillEmail(testData.validUser.email);
        await expect(page.locator(Locators.emailError)).not.toBeVisible();
    });

    test('Should validate "Password" field', async ({ page }) => {
        await registrationPage.clickSignUp();
        await page.locator(Locators.passwordInput).focus();
        await page.click('body');
        await expect(page.locator('text=Password required')).toBeVisible();

        await registrationPage.fillPassword(testData.invalidUser.password);
        await expect(page.locator(Locators.passwordInput)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(Locators.passwordError)).toBeVisible();

        await registrationPage.fillPassword(testData.validUser.password);
        await expect(page.locator('text=Password required')).not.toBeVisible();
    });

    test('Should display validation error for incorrect login', async ({ page }) => {
        await loginPage.clickSignIn();
        await loginPage.fillEmail(testData.invalidUser.wrongEmail);
        await loginPage.fillPassword(testData.invalidUser.wrongPassword);
        await loginPage.clickLogin();
        await expect(page.locator(Locators.wrongLoginError)).toBeVisible();
        await expect(page.locator(Locators.wrongLoginError)).toHaveCSS('color', 'rgb(114, 28, 36)');
    });

    test('Incorrect login with XPath', async ({ page }) => {
        await loginPage.clickSignIn();
        await loginPage.fillEmail(testData.invalidUser.wrongEmail);
        await loginPage.fillPassword(testData.invalidUser.wrongPassword);
        await loginPage.clickLogin();
        const message = page.locator(Locators.loginErrorXPath);
        await expect(message).toHaveText('Wrong email or password');
    });

    test('Correct login', async ({ page }) => {
        await loginPage.clickSignIn();
        await loginPage.fillEmail(testData.validUser.email);
        await loginPage.fillPassword(testData.validUser.password);
        await loginPage.clickLogin();
        await expect(page).toHaveURL(/.*\/panel\/garage/);
    });
});
