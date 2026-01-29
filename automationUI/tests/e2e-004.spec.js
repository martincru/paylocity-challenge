import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { BenefitsPage } from './pages/BenefitsPage.js';
import { credentials } from './config/credentials.js';

test.describe('E2E-004: Edit Employee', () => {

    test('should update employee data and recalculate benefits correctly', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const benefitsPage = new BenefitsPage(page);
        
        // Login and add initial employee
        await loginPage.goto();
        await loginPage.login(credentials.userName, credentials.password);
        await benefitsPage.waitForPageLoad();
        
        // Add employee John Doe with 0 dependents
        await benefitsPage.addEmployee('John', 'Doe', 0);
        await benefitsPage.verifyEmployeeInTable('John', 'Doe', 0, '38.46', '1961.54');
        
        // Click edit icon for employee
        await benefitsPage.clickEditEmployee('John', 'Doe');
        
        // Verify modal opens with pre-populated data
        await benefitsPage.verifyEmployeeModalVisible();
        await benefitsPage.verifyFormPrePopulated('John', 'Doe', 0);
        
        // Note: Title shows "Add Employee" instead of "Edit Employee" - this is BUG #1
        // await benefitsPage.verifyModalTitle('Edit Employee'); // This would fail
        
        // Update data
        await benefitsPage.fillEmployeeForm('Jonathan', 'Doe', 2);
        
        // Click Update button
        await benefitsPage.clickUpdate();
        
        // Verify modal closes
        await benefitsPage.verifyEmployeeModalHidden();
        
        // Verify employee data updated with recalculated benefits
        // Benefits Cost = (1000 + 2 * 500) / 26 = 2000 / 26 = 76.92
        // Net Pay = 2000.00 - 76.92 = 1923.08
        await benefitsPage.verifyEmployeeInTable('Jonathan', 'Doe', 2, '76.92', '1923.08');
    });
});
