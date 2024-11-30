import { Page } from '@playwright/test';
import { Locators } from './Locators';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickSignIn() {
        await this.page.click(Locators.signinButton);
    }

    async fillEmail(email: string) {
        await this.page.fill(Locators.loginEmailInput, email);
    }

    async fillPassword(password: string) {
        await this.page.fill(Locators.loginPasswordInput, password);
    }

    async clickLogin() {
        await this.page.click(Locators.loginButton);
    }

    async getLoginError() {
        return this.page.locator(Locators.wrongLoginError);
    }
}
