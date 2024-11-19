import { Page, APIRequestContext } from '@playwright/test';

export async function login(page: Page, email: string, password: string): Promise<void> {
    await page.goto('/');
    await page.click('button:has-text("Sign In")');
    await page.fill('#signinEmail', email);
    await page.fill('#signinPassword', password);
    await page.click('button:has-text("Login")');
    await page.waitForURL('**/panel/garage');
}
export async function loginWithAPI(apiContext: APIRequestContext, email: string, password: string) {
    const response = await apiContext.post('/auth/login', {
        data: {
            email,
            password,
        },
    });

    if (!response.ok()) {
        throw new Error(`Login failed with status ${response.status()}`);
    }

    const responseBody = await response.json();
    return responseBody.data;
}