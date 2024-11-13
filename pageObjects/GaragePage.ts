import { Page } from '@playwright/test';
import { Locators } from './Locators';

export class GaragePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openAddCarModal() {
        await this.page.click(Locators.addCarButton);
    }

    async fillCarDetails(brand: string, model: string, mileage: string) {
        await this.page.selectOption(Locators.carBrandDropdown, brand);
        await this.page.selectOption(Locators.carModelDropdown, model);
        await this.page.fill(Locators.carMileageInput, mileage);
    }

    async submitCar() {
        await this.page.click(Locators.submitCarButton);
    }

    async validateCarExists(brand: string, model: string) {
        await this.page.waitForSelector(`text=${brand} ${model}`);
        const carExists = await this.page.isVisible(`text=${brand} ${model}`);
        if (!carExists) {
            throw new Error(`Car ${brand} ${model} not found in the garage.`);
        }
    }

    async deleteCar(brand: string, model: string) {
        const carSelector = `div:has-text("${brand} ${model}")`;
        await this.page.click(`${carSelector} button.btn.btn-edit`);
        await this.page.click('button.btn.btn-outline-danger:has-text("Remove car")');
        await this.page.click('button.btn.btn-danger:has-text("Remove")');

    }

    async validateCarDoesNotExist(brand: string, model: string): Promise<void> {
        const carSelector = `div:has-text("${brand} ${model}")`;
        await this.page.waitForSelector(carSelector, { state: 'hidden' });
    }
}
