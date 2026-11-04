
import { test as setup, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const authFile = path.resolve('playwright/.auth/user.json');

setup('User authentication', async ({ page }) => {
    const email = process.env.USER_EMAIL!;
    const password = process.env.USER_PASSWORD!;

    await page.goto('/');

    // Login
    await page.locator('[class*="header_signin"]').click();
    await page.locator('#signinEmail').fill(email);
    await page.locator('#signinPassword').fill(password);
    await page.getByRole('button', { name: 'Login', exact: true }).click();

    // Verify successful login
    await expect(page.locator('h1')).toHaveText('Garage');

    // Create directory for storage state
    await mkdir(path.dirname(authFile), { recursive: true });

    // Save authenticated browser state
    await page.context().storageState({ path: authFile });
});
