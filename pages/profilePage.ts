import { type Page, type Locator } from '@playwright/test';

export class ProfilePage {
    readonly page: Page;
    readonly profileName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.profileName = page.locator('.profile_name');
    }

    async open(): Promise<void> {
        await this.page.goto('/panel/profile');
    }
}