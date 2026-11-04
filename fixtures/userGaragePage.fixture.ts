
import { test as base } from '@playwright/test';
import path from 'node:path';
import { GaragePage } from '../pages/garagePage';

const authFile = path.resolve('playwright/.auth/user.json');

type MyFixtures = {
    userGaragePage: GaragePage;
};

export const test = base.extend<MyFixtures>({
    userGaragePage: async ({ browser }, use) => {
        // Create a new browser context with saved authentication
        const context = await browser.newContext({
            baseURL: process.env.BASE_URL,
            httpCredentials: {
                username: process.env.HTTP_USERNAME!,
                password: process.env.HTTP_PASSWORD!,
            },
            storageState: authFile,
        });

        const page = await context.newPage();

        await page.goto('/');

        const garagePage = new GaragePage(page);

        await use(garagePage);

        await context.close();
    },
});

export { expect } from '@playwright/test';
