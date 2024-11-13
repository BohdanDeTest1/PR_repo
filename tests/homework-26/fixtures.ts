import { test as baseTest } from '@playwright/test';
import { GaragePage } from '../../pageObjects/GaragePage';

type UserFixtures = {
    userGaragePage: GaragePage;
};

export const test = baseTest.extend<UserFixtures>({
    userGaragePage: async ({ page }, use) => {
        const garagePage = new GaragePage(page);
        await page.goto('/panel/garage');
        await use(garagePage);
    },
});