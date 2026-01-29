import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { BenefitsPage } from './pages/BenefitsPage.js';
import { credentials } from './config/credentials.js';

test.describe('E2E-003: Add Employee (Multiple Dependents)', () => {

    test('should create employee with 3 dependents and correct benefit calculations', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const benefitsPage = new BenefitsPage(page);
        
        // Login
        await loginPage.goto();
        await loginPage.login(credentials.userName, credentials.password);
        await benefitsPage.waitForPageLoad();
        
        // Add employee with 3 dependents
        await benefitsPage.addEmployee('Mariana', 'Lopez', 3);
        
        // Verify employee in table with correct calculations
        // Benefits Cost = (1000 + 3 * 500) / 26 = 2500 / 26 = 96.15
        // Net Pay = 2000.00 - 96.15 = 1903.85
        await benefitsPage.verifyEmployeeInTable('Mariana', 'Lopez', 3, '96.15', '1903.85');
    });
});
