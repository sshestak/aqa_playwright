import { type Page, type Locator } from '@playwright/test';

export class GaragePage {
    readonly page: Page;
    readonly title: Locator;
    readonly addCarButton: Locator;
    readonly sidebarMenu: Locator;
    readonly carList: Locator;
    readonly carItem: Locator;
    readonly carLogoImage: Locator;
    readonly carName: Locator;
    readonly carBody: Locator;
    readonly carActionButtons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('h1');
        this.addCarButton = page.getByRole('button', { name: 'Add Car' });
        this.sidebarMenu = page.locator('nav.sidebar');
        this.carList = page.locator('.car-list');
        this.carItem = page.locator('.car-item').first();
        this.carLogoImage = page.locator('.car-logo_img').first();
        this.carName = page.locator('.car_name').first();
        this.carBody = page.locator('.car-body').first();
        this.carActionButtons = page.locator('.car_actions').first();
    }
}
