import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { BenefitsPage } from './pages/BenefitsPage.js';
import { credentials } from './config/credentials.js';

test.describe('E2E-012: Tab Navigation Flow', () => {

    test('should complete form submission using only keyboard', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const benefitsPage = new BenefitsPage(page);
        
        // Login
        await loginPage.goto();
        await loginPage.login(credentials.userName, credentials.password);
        await benefitsPage.waitForPageLoad();
        
        // Open modal
        await benefitsPage.clickAddEmployee();
        
        // First Name should be auto-focused
        await expect(benefitsPage.firstNameInput).toBeFocused();
        
        // Type First Name
        await page.keyboard.type('Keyboard');
        
        // Tab to Last Name
        await page.keyboard.press('Tab');
        await expect(benefitsPage.lastNameInput).toBeFocused();
        await page.keyboard.type('User');
        
        // Tab to Dependents
        await page.keyboard.press('Tab');
        await expect(benefitsPage.dependentsInput).toBeFocused();
        await page.keyboard.type('1');
        
        // Tab to Add button
        await page.keyboard.press('Tab');
        await expect(benefitsPage.addButton).toBeFocused();
        
        // Press Enter on Add button
        await page.keyboard.press('Enter');
        
        // Verify employee was added
        await benefitsPage.verifyModalHidden();
        await benefitsPage.verifyEmployeeInTable('Keyboard', 'User', 1, '57.69', '1942.31');
    });

    test('should navigate through all form controls with Tab', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const benefitsPage = new BenefitsPage(page);
        
        await loginPage.goto();
        await loginPage.login(credentials.userName, credentials.password);
        await benefitsPage.waitForPageLoad();
        
        await benefitsPage.clickAddEmployee();
        
        // Verify tab order
        await expect(benefitsPage.firstNameInput).toBeFocused();
        
        await page.keyboard.press('Tab');
        await expect(benefitsPage.lastNameInput).toBeFocused();
        
        await page.keyboard.press('Tab');
        await expect(benefitsPage.dependentsInput).toBeFocused();
        
        await page.keyboard.press('Tab');
        await expect(benefitsPage.addButton).toBeFocused();
        
        await page.keyboard.press('Tab');
        await expect(benefitsPage.cancelButton).toBeFocused();
    });
});
