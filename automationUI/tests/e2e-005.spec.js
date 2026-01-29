import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { BenefitsPage } from './pages/BenefitsPage.js';
import { credentials } from './config/credentials.js';

test.describe('E2E-005: Delete Employee', () => {

    test('should successfully delete employee with confirmation', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const benefitsPage = new BenefitsPage(page);
        
        // Login and add employee
        await loginPage.goto();
        await loginPage.login(credentials.userName, credentials.password);
        await benefitsPage.waitForPageLoad();
        
        await benefitsPage.addEmployee('Maria', 'Garcia', 3);
        await benefitsPage.verifyEmployeeInTable('Maria', 'Garcia', 3);
        
        // Click delete icon
        await benefitsPage.clickDeleteEmployee('Maria', 'Garcia');
        
        // Verify confirmation modal
        await benefitsPage.verifyDeleteModalVisible();
        await benefitsPage.verifyDeleteConfirmation('Maria', 'Garcia');
        
        // Confirm deletion
        await benefitsPage.confirmDelete();
        
        // Verify modal closes
        await benefitsPage.verifyModalHidden();
        
        // Verify employee removed from table
        await benefitsPage.verifyEmployeeNotInTable('Maria', 'Garcia');
    });
});
