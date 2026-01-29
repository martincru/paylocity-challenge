import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { BenefitsPage } from './pages/BenefitsPage.js';
import { credentials } from './config/credentials.js';

test.describe('E2E-007: Add, Edit, Delete Full Lifecycle', () => {

    test('should complete full CRUD lifecycle for an employee', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const benefitsPage = new BenefitsPage(page);
        
        // Login
        await loginPage.goto();
        await loginPage.login(credentials.userName, credentials.password);
        await benefitsPage.waitForPageLoad();
        
        // CREATE: Add new employee with 1 dependent
        await benefitsPage.addEmployee('Test7', 'User7', 1);
        
        // READ: Verify employee data displayed correctly
        // Benefits Cost = (1000 + 1 * 500) / 26 = 1500 / 26 = 57.69
        await benefitsPage.verifyEmployeeInTable('Test7', 'User7', 1, '57.69', '1942.31');
        
        // UPDATE: Edit to 3 dependents
        await benefitsPage.clickEditEmployee('Test7', 'User7');
        await benefitsPage.fillEmployeeForm('Test7', 'User7', 3);
        await benefitsPage.clickUpdate();
        
        // Verify benefits cost updates
        // Benefits Cost = (1000 + 3 * 500) / 26 = 2500 / 26 = 96.15
        await benefitsPage.verifyEmployeeInTable('Test7', 'User7', 3, '96.15', '1903.85');
        
        // DELETE: Remove the employee
        await benefitsPage.clickDeleteEmployee('Test7', 'User7');
        await benefitsPage.confirmDelete();
        
        // Verify employee removed from table
        await benefitsPage.verifyEmployeeNotInTable('Test7', 'User7');
    });
});
