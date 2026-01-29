import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { BenefitsPage } from './pages/BenefitsPage.js';
import { credentials, urls } from './config/credentials.js';


test.describe('Negative Tests - Login', () => {

    test.describe('NEG-001: Login with Invalid Username', () => {
        test('should reject login with invalid username', async ({ page }) => {
            const loginPage = new LoginPage(page);
            
            await test.step('Navigate to login page', async () => {
                await loginPage.goto();
            });
            
            await test.step('Enter invalid username with valid password', async () => {
                await loginPage.usernameInput.fill('InvalidUser123');
                await loginPage.passwordInput.fill(credentials.password);
                await loginPage.loginButton.click();
            });
            
            await test.step('Verify error handling', async () => {
                await loginPage.verifyValidationErrorMessage(2);
            });
        });
    });

    test.describe('NEG-002: Login with Invalid Password', () => {
        test('should reject login with invalid password', async ({ page }) => {
            const loginPage = new LoginPage(page);
            
            await test.step('Navigate to login page', async () => {
                await loginPage.goto();
            });
            
            await test.step('Enter valid username with invalid password', async () => {
                await loginPage.usernameInput.fill(credentials.userName);
                await loginPage.passwordInput.fill('WrongPassword');
                await loginPage.loginButton.click();
            });
            
            await test.step('Verify error handling', async () => {

                await loginPage.verifyValidationErrorMessage(2);

            });
        });
    });

    test.describe('NEG-003: Login with Empty Credentials', () => {
        test('should prevent login with empty fields and show validation message', async ({ page }) => {
            const loginPage = new LoginPage(page);
            
            await test.step('Navigate to login page', async () => {
                await loginPage.goto();
            });
            
            await test.step('Attempt login with empty fields', async () => {
                // Leave fields empty and try to submit
                await loginPage.loginButton.click();
            });
            
            await test.step('Verify validation error message is displayed', async () => {
                await loginPage.verifyValidationErrorMessage(1);
            });
        });
    });
});
