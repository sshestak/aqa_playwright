import { test, expect } from '@playwright/test';
import { ProfilePage } from '../pages/profilePage';

test.use({
    storageState: 'playwright/.auth/user.json',
});

test.describe('User profile', () => {
    test('Profile should display mocked user data', async ({ page }) => {
        const profilePage = new ProfilePage(page);

        const mockedName = 'John';
        const mockedLastName = 'Doe';

        // Intercept API request
        await page.route('https://qauto.forstudy.space/api/users/profile', async (route) => {
            const response = await route.fetch();
            const body = await response.json();

            body.data.name = mockedName;
            body.data.lastName = mockedLastName;

            await route.fulfill({
                response,
                json: body,
            });
        });

        // check mocked data on profile page
        await profilePage.open();
        await expect(profilePage.profileName).toContainText(mockedName);
        await expect(profilePage.profileName).toContainText(mockedLastName);
    });
});