import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { BenefitsPage } from './pages/BenefitsPage.js';
import { credentials } from './config/credentials.js';

test.describe('E2E-006: Cancel Delete Employee Flow', () => {

    test('should preserve employee data when deletion is cancelled', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const benefitsPage = new BenefitsPage(page);
        
        // Login and add employee
        await loginPage.goto();
        await loginPage.login(credentials.userName, credentials.password);
        await benefitsPage.waitForPageLoad();
        
        await benefitsPage.addEmployee('Test', 'User', 1);
        await benefitsPage.verifyEmployeeInTable('Test', 'User', 1);
        
        // Click delete icon
        await benefitsPage.clickDeleteEmployee('Test', 'User');
        
        // Verify confirmation modal appears
        await expect(benefitsPage.deleteModal).toBeVisible();
        await benefitsPage.verifyDeleteConfirmation('Test', 'User');
        
        // Click Cancel
        await benefitsPage.clickCancel();
        
        // Verify modal closes
        await expect(benefitsPage.deleteModal).toBeHidden();
        
        // Verify employee still exists in table
        await benefitsPage.verifyEmployeeInTable('Test', 'User', 1);
    });
});
