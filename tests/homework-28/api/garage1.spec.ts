import { test, expect } from '@playwright/test';
import { loginAndGetAuth } from '../../../pageObjects/authUtils';


test('Example Test', async ({ request }) => {
    const authResponse = await loginAndGetAuth(request);
    const authBody = await authResponse.json();
    expect(authResponse.ok()).toBeTruthy();
    expect(authBody.status).toBe('ok');

    const response = await request.get('/api/cars');
    const body = await response.json();
    console.log(body)
});




