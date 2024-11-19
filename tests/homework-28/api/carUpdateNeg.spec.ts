import { test, expect } from '@playwright/test';
import { loginAndGetAuth } from '../../../pageObjects/authUtils';

test.describe('Negative tests for updating car mileage', () => {
    let authToken: string;

    test.beforeAll(async ({ request }) => {
        // Авторизація
        const authResponse = await loginAndGetAuth(request);
        const authBody = await authResponse.json();
        expect(authResponse.ok()).toBeTruthy();
        expect(authBody.status).toBe('ok');
        authToken = authBody.data.token;
    });

    test('Should return 401 when updating car without authorization', async ({ request }) => {
        const updateCarResponse = await request.put('/api/cars/1', {
            data: {
                carBrandId: 1,
                carModelId: 1,
                mileage: 500,
            },
        });

        expect(updateCarResponse.status()).toBe(401);
        const responseBody = await updateCarResponse.json();
        expect(responseBody.status).toBe('error');
        expect(responseBody.message).toBe('Not authenticated');
        console.log('401 Test Passed: No authorization');
    });
});
