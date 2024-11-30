import { test, expect } from '@playwright/test';
import { mockProfileResponse } from '../../mocks/mockUtils';
import { login } from '../../pageObjects/LoginAuthUtils';

test('Intercept and modify profile response', async ({ page }) => {
    await mockProfileResponse(page);
    await login(page, 'aqa-john.doe@test.com', 'ValidPass123');

    await page.click('#userNavDropdown');
    await page.click('a.dropdown-item.btn.btn-link.user-nav_link:has-text("Profile")');
    await page.waitForResponse('https://qauto.forstudy.space/api/users/profile');
    const profileName = page.locator('p.profile_name.display-4');
    await expect(profileName).toHaveText('Test Test');
    await page.waitForTimeout(1000);
});
