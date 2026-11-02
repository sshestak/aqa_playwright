import { test, expect, type Locator } from '@playwright/test';

test.describe('Registration form', () => {
    const validUser = {
        name: 'Svitlana',
        lastName: 'Shestak',
        email: `qa-test.${Date.now()}@gmail.com`,
        password: 'TestPass123',
    };

    let nameInput: Locator;
    let lastNameInput: Locator;
    let emailInput: Locator;
    let passwordInput: Locator;
    let repeatPasswordInput: Locator;
    let registerButton: Locator;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.locator('[class*="header_signin"]').click();
        await page.getByText('Registration', { exact: true }).click();

        nameInput = page.locator('#signupName');
        lastNameInput = page.locator('#signupLastName');
        emailInput = page.locator('#signupEmail');
        passwordInput = page.locator('#signupPassword');
        repeatPasswordInput = page.locator('#signupRepeatPassword');

        registerButton = page.getByRole('button', {
        name: 'Register',
        exact: true,
        });
    });

    // Helper function
    async function fillValidForm(): Promise<void> {
        await nameInput.fill(validUser.name);
        await lastNameInput.fill(validUser.lastName);
        await emailInput.fill(validUser.email);
        await passwordInput.fill(validUser.password);
        await repeatPasswordInput.fill(validUser.password);
    }

    test('Should be visible all registration form elements', async () => {
        await expect(nameInput).toBeVisible();
        await expect(lastNameInput).toBeVisible();
        await expect(emailInput).toBeVisible();
        await expect(passwordInput).toBeVisible();
        await expect(repeatPasswordInput).toBeVisible();
        await expect(registerButton).toBeVisible();
    });

    // Tests for Name field validation
    test('Should show an error when Name is empty', async ({ page }) => {
        await nameInput.fill('');
        await lastNameInput.click();
        await expect(page.locator('.invalid-feedback').getByText('Name required')).toBeVisible();
        await expect(registerButton).toBeDisabled();
    });

    test('Should show an error when Name contains non-English letters', async ({ page }) => {
        await nameInput.fill('Світлана');
        await nameInput.press('Tab');
        await expect(page.getByText('Name is invalid')).toBeVisible();
    });

    test('Should show an error when Name contains fewer than 2 characters', async ({ page }) => {
        await nameInput.fill('A');
        await nameInput.press('Tab');
        await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
    });

    test('Should show an error when Name exceeds 20 characters', async ({ page }) => {
        await nameInput.fill('A'.repeat(21));
        await nameInput.press('Tab');
        await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
    });

    test('Name field should have a red border when the value is invalid', async ({ page }) => {
        await nameInput.fill('  Svitlana  ');
        await lastNameInput.click();
        await expect(nameInput).toHaveClass(/is-invalid/);
        await expect(nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    // Tests for Last Name field validation
    test('Should show an error when Last Name is empty', async ({ page }) => {
        await lastNameInput.fill('');
        await passwordInput.click();
        await expect(page.locator('.invalid-feedback').getByText('Last name required')).toBeVisible();
        await expect(registerButton).toBeDisabled();
    });

    test('Last name should contain only English letters', async ({ page }) => {
        await lastNameInput.fill('Шестак');
        await lastNameInput.press('Tab');
        await expect(page.locator('.invalid-feedback').getByText('Last name is invalid')).toBeVisible();
    });

    test('Last name should contain 2-20 characters', async ({ page }) => {
        await lastNameInput.fill('A'.repeat(21));
        await lastNameInput.press('Tab');
        await expect(page.getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();
    });

    test('Last name field should have a red border when the value is invalid', async ({ page }) => {
        await lastNameInput.fill('  Shestak  ');
        await emailInput.click();
        await expect(lastNameInput).toHaveClass(/is-invalid/);
        await expect(lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    // Tests for Email field validation
    test('Should show an error when Email is empty', async ({ page }) => {
        await emailInput.fill('');
        await emailInput.press('Tab');
        await expect(page.getByText('Email required')).toBeVisible();
        await expect(emailInput).toHaveClass(/is-invalid/);
    });

    test('Should show an error when Email has an invalid format', async ({ page }) => {
        await emailInput.fill('invalid-email');
        await emailInput.press('Tab');
        await expect(page.getByText('Email is incorrect')).toBeVisible();
    });

    test('Email field should have a red border when the value is invalid', async ({ page }) => {
        await emailInput.fill('invalid-email');
        await lastNameInput.click();
        await expect(emailInput).toHaveClass(/is-invalid/);
        await expect(emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    // Tests for Password field validation
    test('Should show an error when Password is empty', async ({ page }) => {
        await passwordInput.fill('');
        await repeatPasswordInput.click();
        await expect(page.getByText('Password required')).toBeVisible();
    });

    test('Should show an error when Password contains fewer than 8 characters', async ({ page }) => {
        await passwordInput.fill('Qa123');
        await passwordInput.press('Tab');
        await expect(page.getByText(/Password has to be from 8 to 15/)).toBeVisible();
    });

    test('Password should not exceed 15 characters', async ({ page }) => {
        await passwordInput.fill('QaTesting12345678');
        await passwordInput.press('Tab');
        await expect(page.getByText(/Password has to be from 8 to 15/)).toBeVisible();
    });

    test('Password should contain at least one digit', async ({ page }) => {
        await passwordInput.fill('QaTesting');
        await passwordInput.press('Tab');
        await expect(page.getByText(/Password has to be from 8 to 15/)).toBeVisible();
    });

    test('Password should contain an uppercase letter', async ({ page }) => {
        await passwordInput.fill('qatesting123');
        await passwordInput.press('Tab');
        await expect(page.getByText(/Password has to be from 8 to 15/)).toBeVisible();
    });

    test('Password should contain a lowercase letter', async ({ page }) => {
        await passwordInput.fill('QATESTING123');
        await passwordInput.press('Tab');
        await expect(page.getByText(/Password has to be from 8 to 15/)).toBeVisible();
    });

    test('Password field should have a red border when the value is invalid', async ({ page }) => {
        await passwordInput.fill('invalid-password');
        await repeatPasswordInput.click();
        await expect(passwordInput).toHaveClass(/is-invalid/);
        await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    // Tests for Re-enter Password field validation
    test('Re-enter password is required', async ({ page }) => {
        await passwordInput.fill(validUser.password);
        await repeatPasswordInput.fill('');
        await repeatPasswordInput.press('Tab');
        await expect(page.getByText('Re-enter password required')).toBeVisible();
    });

    test('Passwords should match', async ({ page }) => {
        await passwordInput.fill('QaTest123');
        await repeatPasswordInput.fill('QaTest456');
        await repeatPasswordInput.press('Tab');
        await expect(page.getByText('Passwords do not match')).toBeVisible();
    });

    test('Re-enter password field should have a red border when passwords do not match', async ({ page }) => {
        await passwordInput.fill(validUser.password);
        await repeatPasswordInput.fill('DifferentPass123');
        await repeatPasswordInput.press('Tab');
        await expect(repeatPasswordInput).toHaveClass(/is-invalid/);
        await expect(repeatPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    // Tests for Register button
    test('Register button should be disabled when form is empty', async ({ page }) => {
        await expect(registerButton).toBeDisabled();
    });

    test('Register button should be enabled when all fields are valid', async () => {
        await fillValidForm();
        await expect(registerButton).toBeEnabled();
    });

    test('Register button should remain disabled when one field is invalid', async () => {
        await fillValidForm();
        await nameInput.fill('A');
        await nameInput.press('Tab');
        await expect(registerButton).toBeDisabled();
    });

    // Test for successful registration
    test('User should be registered successfully', async ({ page }) => {
        await fillValidForm();
        await expect(registerButton).toBeEnabled();
        await registerButton.click();
        await expect(page.locator('h1')).toHaveText('Garage');
    });
});
