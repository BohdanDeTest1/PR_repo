import { Page } from '@playwright/test';
import { Locators } from './Locators';

export class RegistrationPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    }

    async clickSignUp() {
        await this.page.click(Locators.signupButton);
    }

    async fillName(name: string) {
        await this.page.fill(Locators.nameInput, name);
    }

    async fillLastName(lastName: string) {
        await this.page.fill(Locators.lastNameInput, lastName);
    }

    async fillEmail(email: string) {
        await this.page.fill(Locators.emailInput, email);
    }

    async fillPassword(password: string) {
        await this.page.fill(Locators.passwordInput, password);
    }

    async fillConfirmPassword(password: string) {
        await this.page.fill(Locators.confirmPasswordInput, password);
    }

    async clickRegister() {
        await this.page.click('button:has-text("Register")');
    }

    async getNameRequiredError() {
        return this.page.locator(Locators.nameRequiredError);
    }

    async getLastNameRequiredError() {
        return this.page.locator(Locators.lastNameRequiredError);
    }

    async getEmailError() {
        return this.page.locator(Locators.emailError);
    }

    async getPasswordError() {
        return this.page.locator(Locators.passwordError);
    }
}
