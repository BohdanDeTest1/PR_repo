import { test, expect, Page } from '@playwright/test';
import testData from '../../fixtures/testData.json';

const SELECTORS = {
    signupButton: 'button:has-text("Sign up")',
    signinButton: 'button:has-text("Sign In")',
    nameInput: '#signupName',
    lastNameInput: '#signupLastName',
    emailInput: '#signupEmail',
    passwordInput: '#signupPassword',
    confirmPasswordInput: '#signupConfirmPassword',
    loginEmailInput: '#signinEmail',
    loginPasswordInput: '#signinPassword',
    loginButton: 'button:has-text("Login")',
    nameRequiredError: 'text=Name required',
    lastNameRequiredError: 'text=Last name required',
    emailError: 'text=Email is incorrect',
    emailRequiredError: 'text=Email required',
    passwordError: 'text=Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
    wrongLoginError: 'text=Wrong email or password',
    loginErrorMessage: '',
    loginErrorXPath: 'xpath=/html/body/ngb-modal-window/div/div/app-signin-modal/div[2]/app-signin-form/form/p'

};


test.describe('QAuto Registration and Login Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    });

    test('Should validate "Name" field', async ({ page }) => {
        await page.click(SELECTORS.signupButton);
        await page.locator(SELECTORS.nameInput).focus();
        await page.locator('body').click();
        await expect(page.locator(SELECTORS.nameRequiredError)).toBeVisible();

        await page.fill(SELECTORS.nameInput, testData.invalidUser.name);
        await page.locator(SELECTORS.nameInput).blur();
        await expect(page.locator(SELECTORS.nameInput)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('text=Name has to be from 2 to 20 characters long')).toBeVisible();

        await page.fill(SELECTORS.nameInput, testData.validUser.name);
        await page.locator(SELECTORS.nameInput).blur();
        await expect(page.locator(SELECTORS.nameRequiredError)).not.toBeVisible();
    });

    test('Should validate "Last Name" field', async ({ page }) => {
        await page.click(SELECTORS.signupButton);
        await page.locator(SELECTORS.lastNameInput).focus();
        await page.locator('body').click();
        await expect(page.locator(SELECTORS.lastNameRequiredError)).toBeVisible();

        await page.fill(SELECTORS.lastNameInput, testData.invalidUser.lastName);
        await page.locator(SELECTORS.lastNameInput).blur();
        await expect(page.locator(SELECTORS.lastNameInput)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('text=Last name has to be from 2 to 20 characters long')).toBeVisible();

        await page.fill(SELECTORS.lastNameInput, testData.validUser.lastName);
        await page.locator(SELECTORS.lastNameInput).blur();
        await expect(page.locator(SELECTORS.lastNameRequiredError)).not.toBeVisible();
    });

    test('Should validate "Email" field', async ({ page }) => {
        await page.click(SELECTORS.signupButton);
        await page.locator(SELECTORS.emailInput).focus();
        await page.waitForTimeout(1000);
        await page.locator(SELECTORS.lastNameInput).focus();
        await expect(page.locator(SELECTORS.emailRequiredError)).toBeVisible()

        await page.fill(SELECTORS.emailInput, testData.invalidUser.email);
        await page.locator(SELECTORS.emailInput).blur();
        await expect(page.locator(SELECTORS.emailInput)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(SELECTORS.emailError)).toBeVisible();

        await page.fill(SELECTORS.emailInput, testData.validUser.email);
        await page.locator(SELECTORS.emailInput).blur();
        await expect(page.locator(SELECTORS.emailError)).not.toBeVisible();
    });

    test('Should validate "Password" field', async ({ page }) => {
        await page.click(SELECTORS.signupButton);
        await page.locator(SELECTORS.passwordInput).focus();
        await page.locator('body').click();
        await expect(page.locator('text=Password required')).toBeVisible();

        await page.fill(SELECTORS.passwordInput, testData.invalidUser.password);
        await page.locator(SELECTORS.passwordInput).blur();
        await expect(page.locator(SELECTORS.passwordInput)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(SELECTORS.passwordError)).toBeVisible();

        await page.fill(SELECTORS.passwordInput, testData.validUser.password);
        await page.locator(SELECTORS.passwordInput).blur();
        await expect(page.locator('text=Password required')).not.toBeVisible();
    });

    test('Should display validation error for incorrect login', async ({ page }) => {
        await page.click(SELECTORS.signinButton);
        await page.fill(SELECTORS.loginEmailInput, testData.invalidUser.wrongEmail);
        await page.fill(SELECTORS.loginPasswordInput, testData.invalidUser.wrongPassword);
        await page.click(SELECTORS.loginButton);
        await expect(page.locator(SELECTORS.wrongLoginError)).toBeVisible();
        await expect(page.locator(SELECTORS.wrongLoginError)).toHaveCSS('color', 'rgb(114, 28, 36)');
    });

    test('Incorrect login', async ({ page }) => {
        await page.click(SELECTORS.signinButton);
        await page.fill(SELECTORS.loginEmailInput, testData.invalidUser.wrongEmail);
        await page.fill(SELECTORS.loginPasswordInput, testData.invalidUser.wrongPassword);
        await page.click(SELECTORS.loginButton);
        const message = page.locator(SELECTORS.loginErrorXPath);
        await expect(message).toHaveText('Wrong email or password');
    });

    test('Correct login', async ({ page }) => {
        await page.click(SELECTORS.signinButton);
        await page.fill(SELECTORS.loginEmailInput, testData.validUser.email);
        await page.fill(SELECTORS.loginPasswordInput, testData.validUser.password);
        await page.click(SELECTORS.loginButton);
        await expect(page).toHaveURL(/.*\/panel\/garage/);
    });
});
