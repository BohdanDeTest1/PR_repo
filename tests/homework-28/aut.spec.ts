import { test, expect, APIRequestContext, request } from '@playwright/test';

test.describe('Authentication API Tests', () => {
    let apiContext: APIRequestContext;

    // Ініціалізація API контексту
    test.beforeAll(async ({ playwright }) => {
        apiContext = await playwright.request.newContext({
            baseURL: 'https://guest:welcome2qauto@qauto.forstudy.space',
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
            },
        });
    });

    // Очистка API контексту
    test.afterAll(async () => {
        await apiContext.dispose();
    });

    // Тест на успішну авторизацію
    test('Positive: Successful login', async () => {
        const response = await apiContext.post('/auth/signin', {
            data: {
                email: 'aqa-john.doe@test.com', // Заміни на реальний email
                password: 'ValidPass123', // Заміни на реальний пароль
                remember: false,
            },
        });

        // Перевірка статусу
        expect(response.status()).toBe(200);

        // Перевірка відповіді
        const responseBody = await response.json();
        expect(responseBody.status).toBe('ok');
        expect(responseBody.data).toHaveProperty('userId');
        expect(responseBody.data).toHaveProperty('distanceUnits', 'km'); // Наприклад, якщо очікується km
        expect(responseBody.data).toHaveProperty('currency', 'usd'); // Наприклад, якщо очікується usd
    });

    // Негативний сценарій: Невірний пароль
    test('Negative: Invalid password', async () => {
        const response = await apiContext.post('/auth/signin', {
            data: {
                email: 'test@test.com', // Реальний email
                password: 'wrongpassword', // Невірний пароль
                remember: false,
            },
        });

        // Перевірка статусу
        expect(response.status()).toBe(400);

        // Перевірка відповіді
        const responseBody = await response.json();
        expect(responseBody.status).toBe('error');
        expect(responseBody.message).toBe('Bad request');
    });

    // Негативний сценарій: Порожній запит
    test('Negative: Empty request body', async () => {
        const response = await apiContext.post('/auth/signin', {
            data: {},
        });

        // Перевірка статусу
        expect(response.status()).toBe(400);

        // Перевірка відповіді
        const responseBody = await response.json();
        expect(responseBody.status).toBe('error');
        expect(responseBody.message).toBe('Bad request');
    });
});
