import { test, expect } from '@playwright/test';
import { loginAndGetAuth } from '../../../pageObjects/authUtils';

test('Create a car and update its mileage', async ({ request }) => {
    // Авторизація
    const authResponse = await loginAndGetAuth(request);
    const authBody = await authResponse.json();
    expect(authResponse.ok()).toBeTruthy();
    expect(authBody.status).toBe('ok');

    // Дані для створення машини
    const carBrandId = 1; // Audi
    const carModelId = 1; // TT
    const initialMileage = 100;

    // Створення машини
    const createCarResponse = await request.post('/api/cars', {
        headers: { Authorization: `Bearer ${authBody.data.token}` },
        data: {
            carBrandId,
            carModelId,
            mileage: initialMileage,
        },
    });

    expect(createCarResponse.ok()).toBeTruthy();
    const createCarBody = await createCarResponse.json();
    expect(createCarBody.status).toBe('ok');

    const createdCarId = createCarBody.data.id;
    console.log('Car created successfully:', createdCarId);
    console.log('Car mileage before update:', initialMileage);

    // Новий пробіг
    const updatedMileage = 500;

    // Оновлення пробігу машини
    const updateCarResponse = await request.put(`/api/cars/${createdCarId}`, {
        headers: { Authorization: `Bearer ${authBody.data.token}` },
        data: {
            carBrandId,
            carModelId,
            mileage: updatedMileage,
        },
    });

    expect(updateCarResponse.ok()).toBeTruthy();
    const updateCarBody = await updateCarResponse.json();
    expect(updateCarBody.status).toBe('ok');
    expect(updateCarBody.data.mileage).toBe(updatedMileage);

    console.log('Car mileage updated successfully:', updateCarBody.data.mileage);
});
