import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate user', async ({ page }) => {
    await page.goto(process.env.BASE_URL || 'https://guest:welcome2qauto@qauto.forstudy.space');
    await page.click('button:has-text("Sign In")');
    await page.fill('#signinEmail', 'aqa-john.doe@test.com');
    await page.fill('#signinPassword', 'ValidPass123');
    await page.click('button:has-text("Login")');
    await page.waitForURL('https://guest:welcome2qauto@qauto.forstudy.space/panel/garage');

    // Зберігаємо storage state
    await page.context().storageState({ path: authFile });
});
