import { test, expect } from '@playwright/test';
import { RegistrationModal } from '../pages/registrationModal';

test.describe('Registration form', () => {
    const validUser = {
        name: 'Svitlana',
        lastName: 'Shestak',
        email: `qa-test.${Date.now()}@gmail.com`,
        password: 'TestPass123',
    };

    let registrationModal: RegistrationModal;

    test.beforeEach(async ({ page }) => {
        registrationModal = new RegistrationModal(page);
        await registrationModal.open();
    });

    test('Should be visible all registration form elements', async () => {
        await expect(registrationModal.nameInput).toBeVisible();
        await expect(registrationModal.lastNameInput).toBeVisible();
        await expect(registrationModal.emailInput).toBeVisible();
        await expect(registrationModal.passwordInput).toBeVisible();
        await expect(registrationModal.repeatPasswordInput).toBeVisible();
        await expect(registrationModal.registerButton).toBeVisible();
    });

    // Tests for Name field validation
    test('Should show an error when Name is empty', async ({ page }) => {
        await registrationModal.fillName('');
        await registrationModal.blurLastName();
        await expect(page.locator('.invalid-feedback').getByText('Name required')).toBeVisible();
        await expect(registrationModal.registerButton).toBeDisabled();
    });

    test('Should show an error when Name contains non-English letters', async ({ page }) => {
        await registrationModal.fillName('Світлана');
        await registrationModal.blurName();
        await expect(page.getByText('Name is invalid')).toBeVisible();
    });

    test('Should show an error when Name contains fewer than 2 characters', async ({ page }) => {
        await registrationModal.fillName('A');
        await registrationModal.blurName();
        await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
    });

    test('Should show an error when Name exceeds 20 characters', async ({ page }) => {
        await registrationModal.fillName('A'.repeat(21));
        await registrationModal.blurName();
        await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
    });

    test('Name field should have a red border when the value is invalid', async ({ page }) => {
        await registrationModal.fillName('  Svitlana  ');
        await registrationModal.blurName();
        await expect(registrationModal.nameInput).toHaveClass(/is-invalid/);
        await expect(registrationModal.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    // Tests for Last Name field validation
    test('Should show an error when Last Name is empty', async ({ page }) => {
        await registrationModal.fillLastName('');
        await registrationModal.blurEmail();
        await expect(page.locator('.invalid-feedback').getByText('Last name required')).toBeVisible();
        await expect(registrationModal.registerButton).toBeDisabled();
    });

    test('Last name should contain only English letters', async ({ page }) => {
        await registrationModal.fillLastName('Шестак');
        await registrationModal.blurLastName();
        await expect(page.locator('.invalid-feedback').getByText('Last name is invalid')).toBeVisible();
    });

    test('Last name should contain 2-20 characters', async ({ page }) => {
        await registrationModal.fillLastName('A'.repeat(21));
        await registrationModal.blurLastName();
        await expect(page.getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();
    });

    test('Last name field should have a red border when the value is invalid', async ({ page }) => {
        await registrationModal.fillLastName('  Shestak  ');
        await registrationModal.blurLastName();
        await expect(registrationModal.lastNameInput).toHaveClass(/is-invalid/);
        await expect(registrationModal.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    // Tests for Email field validation
    test('Should show an error when Email is empty', async ({ page }) => {
        await registrationModal.fillEmail('');
        await registrationModal.blurEmail();
        await expect(page.getByText('Email required')).toBeVisible();
        await expect(registrationModal.emailInput).toHaveClass(/is-invalid/);
    });

    test('Should show an error when Email has an invalid format', async ({ page }) => {
        await registrationModal.fillEmail('invalid-email');
        await registrationModal.blurEmail();
        await expect(page.getByText('Email is incorrect')).toBeVisible();
    });

    test('Email field should have a red border when the value is invalid', async ({ page }) => {
        await registrationModal.fillEmail('invalid-email');
        await registrationModal.blurEmail();
        await expect(registrationModal.emailInput).toHaveClass(/is-invalid/);
        await expect(registrationModal.emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    // Tests for Password field validation
    test('Should show an error when Password is empty', async ({ page }) => {
        await registrationModal.fillPassword('');
        await registrationModal.blurPassword();
        await expect(page.getByText('Password required')).toBeVisible();
    });

    test('Should show an error when Password contains fewer than 8 characters', async ({ page }) => {
        await registrationModal.fillPassword('Qa123');
        await registrationModal.blurPassword();
        await expect(page.getByText(/Password has to be from 8 to 15/)).toBeVisible();
    });

    test('Password should not exceed 15 characters', async ({ page }) => {
        await registrationModal.fillPassword('QaTesting12345678');
        await registrationModal.blurPassword();
        await expect(page.getByText(/Password has to be from 8 to 15/)).toBeVisible();
    });

    test('Password should contain at least one digit', async ({ page }) => {
        await registrationModal.fillPassword('QaTesting');
        await registrationModal.blurPassword();
        await expect(page.getByText(/Password has to be from 8 to 15/)).toBeVisible();
    });

    test('Password should contain an uppercase letter', async ({ page }) => {
        await registrationModal.fillPassword('qatesting123');
        await registrationModal.blurPassword();
        await expect(page.getByText(/Password has to be from 8 to 15/)).toBeVisible();
    });

    test('Password should contain a lowercase letter', async ({ page }) => {
        await registrationModal.fillPassword('QATESTING123');
        await registrationModal.blurPassword();
        await expect(page.getByText(/Password has to be from 8 to 15/)).toBeVisible();
    });

    test('Password field should have a red border when the value is invalid', async ({ page }) => {
        await registrationModal.fillPassword('invalid-password');
        await registrationModal.blurPassword();
        await expect(registrationModal.passwordInput).toHaveClass(/is-invalid/);
        await expect(registrationModal.passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    // Tests for Re-enter Password field validation
    test('Re-enter password is required', async ({ page }) => {
        await registrationModal.fillPassword(validUser.password);
        await registrationModal.fillRepeatPassword('');
        await registrationModal.blurRepeatPassword();
        await expect(page.getByText('Re-enter password required')).toBeVisible();
    });

    test('Passwords should match', async ({ page }) => {
        await registrationModal.fillPassword('QaTest123');
        await registrationModal.fillRepeatPassword('QaTest456');
        await registrationModal.blurRepeatPassword();
        await expect(page.getByText('Passwords do not match')).toBeVisible();
    });

    test('Re-enter password field should have a red border when passwords do not match', async ({ page }) => {
        await registrationModal.fillPassword(validUser.password);
        await registrationModal.fillRepeatPassword('DifferentPass123');
        await registrationModal.blurRepeatPassword();
        await expect(registrationModal.repeatPasswordInput).toHaveClass(/is-invalid/);
        await expect(registrationModal.repeatPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    // Tests for Register button
    test('Register button should be disabled when form is empty', async ({ page }) => {
        await expect(registrationModal.registerButton).toBeDisabled();
    });

    test('Register button should be enabled when all fields are valid', async () => {
        await registrationModal.fillValidForm(validUser);
        await expect(registrationModal.registerButton).toBeEnabled();
    });

    test('Register button should remain disabled when one field is invalid', async () => {
        await registrationModal.fillValidForm(validUser);
        await registrationModal.fillName('A');
        await registrationModal.blurName();
        await expect(registrationModal.registerButton).toBeDisabled();
    });

    // Test for successful registration
    test('User should be registered successfully', async ({ page }) => {
        await registrationModal.fillValidForm(validUser);
        await expect(registrationModal.registerButton).toBeEnabled();
        await registrationModal.registerButton.click();
        await expect(page.locator('h1')).toHaveText('Garage');
    });
});
