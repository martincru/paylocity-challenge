import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { BenefitsPage } from './pages/BenefitsPage.js';
import { credentials } from './config/credentials.js';

test.describe('E2E-002: Add Employee (No Dependents)', () => {

    test('should create employee with no dependents and correct calculations', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const benefitsPage = new BenefitsPage(page);
        
        // Login
        await loginPage.goto();
        await loginPage.login(credentials.userName, credentials.password);
        await benefitsPage.waitForPageLoad();
        
        // Click Add Employee button
        await benefitsPage.clickAddEmployee();
        
        // Verify modal opens with empty form
        await benefitsPage.verifyModalVisible();
        await benefitsPage.verifyModalTitle('Add Employee');
        
        // Fill employee data
        await benefitsPage.fillEmployeeForm('John', 'Doe', 0);
        
        // Click Add button
        await benefitsPage.clickAdd();
        
        // Verify modal closes
        await benefitsPage.verifyModalHidden();
        
        // Verify new employee appears in table with correct calculations
        await benefitsPage.verifyEmployeeInTable('John', 'Doe', 0, '38.46', '1961.54');
    });
});
