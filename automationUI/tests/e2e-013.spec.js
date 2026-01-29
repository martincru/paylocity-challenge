import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { BenefitsPage } from './pages/BenefitsPage.js';
import { credentials } from './config/credentials.js';

test.describe('E2E-013: Data Persistence After Refresh', () => {

    test('should persist data after page refresh and re-authentication', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const benefitsPage = new BenefitsPage(page);
        
        // Login and add employee
        await loginPage.goto();
        await loginPage.login(credentials.userName, credentials.password);
        await benefitsPage.waitForPageLoad();
        
        // Add new employee
        const uniqueName = `Refresh${Date.now()}`;
        await benefitsPage.addEmployee(uniqueName, 'Test', 2);
        
        // Verify employee was added
        await benefitsPage.verifyEmployeeInTable(uniqueName, 'Test', 2, '76.92', '1923.08');
        
        // Refresh browser (F5) - this may or may not redirect to login depending on session
        await page.reload();
        
        // Check if we need to login again
        const isLoginPage = page.url().includes('/LogIn');
        if (isLoginPage) {
            await loginPage.login(credentials.userName, credentials.password);
        }
        await benefitsPage.waitForPageLoad();
        
        // Verify employee still exists with correct data
        await benefitsPage.verifyEmployeeInTable(uniqueName, 'Test', 2, '76.92', '1923.08');
    });
});
