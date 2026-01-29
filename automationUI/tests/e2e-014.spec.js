import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { BenefitsPage } from './pages/BenefitsPage.js';
import { credentials } from './config/credentials.js';

test.describe('E2E-014: Complete Workflow Validation', () => {

    test('should verify typical employer workflow end-to-end', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const benefitsPage = new BenefitsPage(page);
        
        // 1. Navigate to application
        await loginPage.goto();
        
        // 2. Login with credentials
        await loginPage.login(credentials.userName, credentials.password);
        await benefitsPage.waitForPageLoad();
        
        // 3. View existing employees and benefits costs
        await benefitsPage.verifyOnBenefitsPage();
        const initialCount = await benefitsPage.getEmployeeCount();
        expect(initialCount).toBeGreaterThan(0);
        
        // 4. Add 2 new employees with different dependents
        // First employee: 1 dependent
        await benefitsPage.addEmployee('WorkflowTest', 'Employee1', 1);
        await benefitsPage.verifyEmployeeInTable('WorkflowTest', 'Employee1', 1, '57.69', '1942.31');
        
        // Second employee: 3 dependents
        await benefitsPage.addEmployee('WorkflowTest', 'Employee2', 3);
        await benefitsPage.verifyEmployeeInTable('WorkflowTest', 'Employee2', 3, '96.15', '1903.85');
        
        // 5. Verify preview of benefit costs for each
        const row1 = await benefitsPage.getEmployeeRow('WorkflowTest', 'Employee1');
        const row2 = await benefitsPage.getEmployeeRow('WorkflowTest', 'Employee2');
        await expect(row1).toBeVisible();
        await expect(row2).toBeVisible();
        
        // 6. Edit one employee's dependent count
        await benefitsPage.clickEditEmployee('WorkflowTest', 'Employee1');
        await benefitsPage.fillEmployeeForm('WorkflowTest', 'Employee1', 2);
        await benefitsPage.clickUpdate();
        
        // 7. Verify costs recalculate
        await benefitsPage.verifyEmployeeInTable('WorkflowTest', 'Employee1', 2, '76.92', '1923.08');
        
        // 8. Remove one employee
        await benefitsPage.clickDeleteEmployee('WorkflowTest', 'Employee2');
        await benefitsPage.confirmDelete();
        
        // 9. Verify final roster and total costs
        await benefitsPage.verifyEmployeeNotInTable('WorkflowTest', 'Employee2');
        await benefitsPage.verifyEmployeeInTable('WorkflowTest', 'Employee1', 2, '76.92', '1923.08');
        
        const finalCount = await benefitsPage.getEmployeeCount();
        expect(finalCount).toBe(initialCount + 1);
        
        // 10. Logout
        await benefitsPage.logout();
        await expect(page).toHaveURL(/.*\/LogIn/);
    });
});