import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { BenefitsPage } from './pages/BenefitsPage.js';
import { credentials } from './config/credentials.js';

test.describe('E2E-008: Multiple Employees Management', () => {

    test('should correctly manage multiple employees with independent calculations', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const benefitsPage = new BenefitsPage(page);
        
        // Login
        await loginPage.goto();
        await loginPage.login(credentials.userName, credentials.password);
        await benefitsPage.waitForPageLoad();
        
        const initialCount = await benefitsPage.getEmployeeCount();
        
        // Add Employee 1: Alice Smith, 0 dependents
        await benefitsPage.addEmployee('Alice', 'Smith', 0);
        
        // Add Employee 2: Bob Johnson, 2 dependents
        await benefitsPage.addEmployee('Bob', 'Johnson', 2);
        
        // Add Employee 3: Carol Williams, 5 dependents
        await benefitsPage.addEmployee('Carol', 'Williams', 5);
        
        // Verify all 3 employees in table
        const newCount = await benefitsPage.getEmployeeCount();
        expect(newCount).toBe(initialCount + 3);
        
        // Verify each has correct calculations
        await benefitsPage.verifyEmployeeInTable('Alice', 'Smith', 0, '38.46', '1961.54');
        await benefitsPage.verifyEmployeeInTable('Bob', 'Johnson', 2, '76.92', '1923.08');
        // Carol: (1000 + 5 * 500) / 26 = 3500 / 26 = 134.62
        await benefitsPage.verifyEmployeeInTable('Carol', 'Williams', 5, '134.62', '1865.38');
        
        // Edit Employee 2 to 1 dependent
        await benefitsPage.clickEditEmployee('Bob', 'Johnson');
        await benefitsPage.fillEmployeeForm('Bob', 'Johnson', 1);
        await benefitsPage.clickUpdate();
        await benefitsPage.verifyEmployeeInTable('Bob', 'Johnson', 1, '57.69', '1942.31');
        
        // Delete Employee 3
        await benefitsPage.clickDeleteEmployee('Carol', 'Williams');
        await benefitsPage.confirmDelete();
        await benefitsPage.verifyEmployeeNotInTable('Carol', 'Williams');
        
        // Verify table shows 2 new employees with correct data
        const finalCount = await benefitsPage.getEmployeeCount();
        expect(finalCount).toBe(initialCount + 2);
        
        await benefitsPage.verifyEmployeeInTable('Alice', 'Smith', 0, '38.46', '1961.54');
        await benefitsPage.verifyEmployeeInTable('Bob', 'Johnson', 1, '57.69', '1942.31');
    });
});
