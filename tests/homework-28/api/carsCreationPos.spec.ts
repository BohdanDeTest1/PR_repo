import { test, expect } from '@playwright/test';
import { loginAndGetAuth } from '../../../pageObjects/authUtils';

test('Add two new cars with authentication', async ({ request }) => {
    const authResponse = await loginAndGetAuth(request);
    const authBody = await authResponse.json();

    expect(authResponse.ok()).toBeTruthy();
    expect(authBody.status).toBe('ok');

    const newCars = [
        {
            carBrandId: 1,
            carModelId: 1,
            mileage: 150,
        },
        {
            carBrandId: 3,
            carModelId: 12,
            mileage: 200,
        },
    ];


    const createFirstCarResponse = await request.post('/api/cars', {
        headers: { Authorization: `Bearer ${authBody.data.token}` },
        data: newCars[0],
    });
    expect(createFirstCarResponse.ok()).toBeTruthy();
    const firstCarBody = await createFirstCarResponse.json();
    expect(firstCarBody.status).toBe('ok');
    console.log('First car created:', firstCarBody.data);

    const createSecondCarResponse = await request.post('/api/cars', {
        headers: { Authorization: `Bearer ${authBody.data.token}` },
        data: newCars[1],
    });
    expect(createSecondCarResponse.ok()).toBeTruthy();
    const secondCarBody = await createSecondCarResponse.json();
    expect(secondCarBody.status).toBe('ok');
    console.log('Second car created:', secondCarBody.data);

    const getCarsResponse = await request.get('/api/cars', {
        headers: { Authorization: `Bearer ${authBody.data.token}` },
    });
    expect(getCarsResponse.ok()).toBeTruthy();
    const carsBody = await getCarsResponse.json();
    const allCars = carsBody.data;

    const firstCar = allCars.find(
        (car: any) =>
            car.carBrandId === newCars[0].carBrandId &&
            car.carModelId === newCars[0].carModelId &&
            car.mileage === newCars[0].mileage
    );
    expect(firstCar).toBeTruthy();

    const secondCar = allCars.find(
        (car: any) =>
            car.carBrandId === newCars[1].carBrandId &&
            car.carModelId === newCars[1].carModelId &&
            car.mileage === newCars[1].mileage
    );
    expect(secondCar).toBeTruthy();

    console.log('Both cars added and verified successfully.');
});
