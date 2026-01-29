import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { BenefitsPage } from './pages/BenefitsPage.js';
import { credentials } from './config/credentials.js';

test.describe('E2E-010: Calculations Validation Across Operations', () => {

    test('should maintain accurate benefit calculations through all operations', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const benefitsPage = new BenefitsPage(page);
        
        // Login
        await loginPage.goto();
        await loginPage.login(credentials.userName, credentials.password);
        await benefitsPage.waitForPageLoad();
        
        // Test calculation with 0 dependents
        // Formula: (1000 + dependents × 500) / 26
        await benefitsPage.addEmployee('Employee', 'Zero', 0);
        await benefitsPage.verifyEmployeeInTable('Employee', 'Zero', 0, '38.46', '1961.54');
        
        // Test calculation with 1 dependent
        // (1000 + 1 × 500) / 26 = 1500 / 26 = 57.69
        await benefitsPage.addEmployee('Employee', 'One', 1);
        await benefitsPage.verifyEmployeeInTable('Employee', 'One', 1, '57.69', '1942.31');
        
        // Test calculation with 2 dependents
        // (1000 + 2 × 500) / 26 = 2000 / 26 = 76.92
        await benefitsPage.addEmployee('Employee', 'Two', 2);
        await benefitsPage.verifyEmployeeInTable('Employee', 'Two', 2, '76.92', '1923.08');
        
        // Edit first employee to 3 dependents
        // (1000 + 3 × 500) / 26 = 2500 / 26 = 96.15
        await benefitsPage.clickEditEmployee('Employee', 'Zero');
        await benefitsPage.fillEmployeeForm('Employee', 'Zero', 3);
        await benefitsPage.clickUpdate();
        await benefitsPage.verifyEmployeeInTable('Employee', 'Zero', 3, '96.15', '1903.85');
        
        // Edit second employee to 0 dependents
        await benefitsPage.clickEditEmployee('Employee', 'One');
        await benefitsPage.fillEmployeeForm('Employee', 'One', 0);
        await benefitsPage.clickUpdate();
        await benefitsPage.verifyEmployeeInTable('Employee', 'One', 0, '38.46', '1961.54');
        
        // Verify Gross Pay is always $2,000.00
        const row1 = await benefitsPage.getEmployeeRow('Employee', 'Zero');
        const row2 = await benefitsPage.getEmployeeRow('Employee', 'One');
        const row3 = await benefitsPage.getEmployeeRow('Employee', 'Two');
        
        await benefitsPage.verifyGrossPay(row1, '2000.00');
        await benefitsPage.verifyGrossPay(row2, '2000.00');
        await benefitsPage.verifyGrossPay(row3, '2000.00');
        
        // Verify Net Pay = Gross Pay - Benefits Cost
        // This is implicitly tested through the verifyEmployeeInTable calls above
    });
});
