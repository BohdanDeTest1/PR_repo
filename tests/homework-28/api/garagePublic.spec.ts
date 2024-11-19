
import test, { expect } from '@playwright/test';

test('Cars models public request', async ({ request }) => {
    const response = await request.get('/api/cars/models');
    const body = await response.json();
    const allCars = body.data;
    const carTitle = allCars[10].title;
    expect(carTitle).toEqual('Fiesta');
    expect(allCars.length).toEqual(23);
    expect(body.status).toEqual('ok');

})