import { test } from './fixtures';


test('User should add a car and validate it exists', async ({ userGaragePage }) => {
    await userGaragePage.openAddCarModal();
    await userGaragePage.fillCarDetails('Ford', 'Focus', '100');
    await userGaragePage.submitCar();
    await userGaragePage.validateCarExists('Ford', 'Focus');
});
test('User should add and delete a car', async ({ userGaragePage }) => {
    await userGaragePage.openAddCarModal();
    await userGaragePage.fillCarDetails('Audi', 'TT', '200');
    await userGaragePage.submitCar();
    await userGaragePage.validateCarExists('Audi', 'TT');
    await userGaragePage.deleteCar('Audi', 'TT');
    await userGaragePage.validateCarDoesNotExist('Audi', 'TT');
});
