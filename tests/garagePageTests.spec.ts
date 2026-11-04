import { test, expect } from '../fixtures/userGaragePage.fixture';

test.describe('Garage page', () => {
    test('Should display Garage page and its elements', async ({
        userGaragePage,
    }) => {
        await expect(userGaragePage.title).toHaveText('Garage');
        await expect(userGaragePage.addCarButton).toBeVisible();
        await expect(userGaragePage.sidebarMenu).toBeVisible();
        await expect(userGaragePage.carList).toBeVisible();
        await expect(userGaragePage.carItem).toBeVisible();
        await expect(userGaragePage.carLogoImage).toBeVisible();
        await expect(userGaragePage.carName).toBeVisible();
        await expect(userGaragePage.carBody).toBeVisible();
        await expect(userGaragePage.carActionButtons).toBeVisible();
    });
});
