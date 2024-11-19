// import { test, expect } from '@playwright/test';
// import { loginAndGetAuth } from '../../../pageObjects/authUtils';

// test('Create one car for each brand and model', async ({ request }) => {
//     const authResponse = await loginAndGetAuth(request);
//     const authBody = await authResponse.json();
//     expect(authResponse.ok()).toBeTruthy();
//     expect(authBody.status).toBe('ok');

//     // Бренди та моделі
//     const brandsAndModels = [
//         { brandId: 1, models: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }] }, // Audi
//         { brandId: 2, models: [{ id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }] }, // BMW
//         { brandId: 3, models: [{ id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }] }, // Ford
//         { brandId: 4, models: [{ id: 16 }, { id: 17 }, { id: 18 }] }, // Porsche
//         { brandId: 5, models: [{ id: 19 }, { id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }] }, // Fiat
//     ];

//     const createdCars = [];

//     for (const brand of brandsAndModels) {
//         for (const model of brand.models) {
//             const mileage = Math.floor(Math.random() * 1000) + 1;
//             const createCarResponse = await request.post('/api/cars', {
//                 headers: { Authorization: `Bearer ${authBody.data.token}` },
//                 data: {
//                     carBrandId: brand.brandId,
//                     carModelId: model.id,
//                     mileage,
//                 },
//             });
//             expect(createCarResponse.ok()).toBeTruthy();
//             const carBody = await createCarResponse.json();
//             expect(carBody.status).toBe('ok');
//             createdCars.push({
//                 brandId: brand.brandId,
//                 modelId: model.id,
//                 carId: carBody.data.id,
//             });
//         }
//     }
// })
import { test, expect } from '@playwright/test';
import { loginAndGetAuth } from '../../../pageObjects/authUtils';

test('Create and delete all cars for each brand and model', async ({ request }) => {
    // Авторизація
    const authResponse = await loginAndGetAuth(request);
    const authBody = await authResponse.json();
    expect(authResponse.ok()).toBeTruthy();
    expect(authBody.status).toBe('ok');

    // Бренди та моделі
    const brandsAndModels = [
        { brandId: 1, models: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }] }, // Audi
        { brandId: 2, models: [{ id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }] }, // BMW
        { brandId: 3, models: [{ id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }] }, // Ford
        { brandId: 4, models: [{ id: 16 }, { id: 17 }, { id: 18 }] }, // Porsche
        { brandId: 5, models: [{ id: 19 }, { id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }] }, // Fiat
    ];

    const createdCars = [];

    // Створення машин
    for (const brand of brandsAndModels) {
        for (const model of brand.models) {
            const mileage = Math.floor(Math.random() * 1000) + 1; // Генеруємо випадковий пробіг
            const createCarResponse = await request.post('/api/cars', {
                headers: { Authorization: `Bearer ${authBody.data.token}` },
                data: {
                    carBrandId: brand.brandId,
                    carModelId: model.id,
                    mileage,
                },
            });
            expect(createCarResponse.ok()).toBeTruthy();
            const carBody = await createCarResponse.json();
            expect(carBody.status).toBe('ok');
            createdCars.push({
                brandId: brand.brandId,
                modelId: model.id,
                carId: carBody.data.id,
            });
        }
    }

    console.log('All cars created successfully:', createdCars);

    // Видалення машин
    for (const car of createdCars) {
        const deleteCarResponse = await request.delete(`/api/cars/${car.carId}`, {
            headers: { Authorization: `Bearer ${authBody.data.token}` },
        });
        expect(deleteCarResponse.ok()).toBeTruthy();
        const deleteBody = await deleteCarResponse.json();
        expect(deleteBody.status).toBe('ok');
        expect(deleteBody.data.carId).toBe(car.carId);
    }

    console.log('All cars deleted successfully');
});
