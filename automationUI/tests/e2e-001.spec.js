import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { BenefitsPage } from './pages/BenefitsPage.js';
import { credentials } from './config/credentials.js';

test.describe('E2E-001: Complete Login to Dashboard Flow', () => {

    test('should successfully login and redirect to Benefits Dashboard', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const benefitsPage = new BenefitsPage(page);
        
        // Navigate to login URL
        await loginPage.goto();
        
        // Enter valid credentials
        await loginPage.login(credentials.userName, credentials.password);
        
        // Verify redirection to Benefits page
        await benefitsPage.verifyOnBenefitsPage();
        
        // Verify employee table is visible
        await expect(benefitsPage.employeeTable).toBeVisible();
    });
});
