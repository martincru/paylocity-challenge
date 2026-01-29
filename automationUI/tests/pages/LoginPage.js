import { expect } from '@playwright/test';
import { urls, timeouts } from '../config/credentials.js';

export class LoginPage {
    constructor(page) {
        this.page = page;

        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Log In' });
    }

    async goto() {
        await this.page.goto(urls.login, { 
        waitUntil: 'domcontentloaded',
        timeout: timeouts.navigation 
        });
    }

    async login(username, password) {

        await this.usernameInput.waitFor({ state: 'visible', timeout: timeouts.default });
        await this.passwordInput.waitFor({ state: 'visible', timeout: timeouts.default });

        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();

        await this.page.waitForLoadState('networkidle', { timeout: timeouts.default });

    }

    async verifyValidationErrorMessage(validationType) {
        // Verify the validation summary div is visible
        const validationDiv = this.page.locator('.text-danger.validation-summary-errors[data-valmsg-summary="true"]');
        await expect(validationDiv).toBeVisible();
        
        // Verify the error message content
        await expect(validationDiv).toContainText('There were one or more problems that prevented you from logging in');
        
        // Verify specific field error (Username or Password required)
        const errorText = await validationDiv.textContent();
        
        switch (validationType) {
            case 1:
                const hasUsernameError = errorText.includes('The Username field is required');
                const hasPasswordError = errorText.includes('The Password field is required');
                expect(hasUsernameError || hasPasswordError).toBe(true);
                break;
            case 2:
                expect(errorText).toContain('The specified username or password is incorrect.');
                break;
            default:
                throw new Error('Invalid validation type specified');
        }
        // Verify still on login page
        await expect(this.page).toHaveURL(/.*\/LogIn/);
    }
}
