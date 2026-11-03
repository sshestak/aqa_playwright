
import { type Page, type Locator } from '@playwright/test';

export class RegistrationModal {
    readonly page: Page;

    readonly nameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly repeatPasswordInput: Locator;
    readonly registerButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.locator('#signupName');
        this.lastNameInput = page.locator('#signupLastName');
        this.emailInput = page.locator('#signupEmail');
        this.passwordInput = page.locator('#signupPassword');
        this.repeatPasswordInput = page.locator('#signupRepeatPassword');

        this.registerButton = page.getByRole('button', {
            name: 'Register',
            exact: true,
        });
    }

    async open(): Promise<void> {
        await this.page.goto('/');
        await this.page.locator('[class*="header_signin"]').click();
        await this.page.getByText('Registration', { exact: true }).click();
    }

    async fillName(value: string): Promise<void> {
        await this.nameInput.fill(value);
    }

    async fillLastName(value: string): Promise<void> {
        await this.lastNameInput.fill(value);
    }

    async fillEmail(value: string): Promise<void> {
        await this.emailInput.fill(value);
    }

    async fillPassword(value: string): Promise<void> {
        await this.passwordInput.fill(value);
    }

    async fillRepeatPassword(value: string): Promise<void> {
        await this.repeatPasswordInput.fill(value);
    }

    async blurName(): Promise<void> {
        await this.lastNameInput.click();
    }

    async blurLastName(): Promise<void> {
        await this.emailInput.click();
    }

    async blurEmail(): Promise<void> {
        await this.passwordInput.click();
    }

    async blurPassword(): Promise<void> {
        await this.repeatPasswordInput.click();
    }

    async blurRepeatPassword(): Promise<void> {
        await this.repeatPasswordInput.press('Tab');
    }

    async fillValidForm(user: {
        name: string;
        lastName: string;
        email: string;
        password: string;
    }): Promise<void> {
        await this.fillName(user.name);
        await this.fillLastName(user.lastName);
        await this.fillEmail(user.email);
        await this.fillPassword(user.password);
        await this.fillRepeatPassword(user.password);
    }

    async submit(): Promise<void> {
        await this.registerButton.click();
    }
}
