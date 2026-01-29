import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { BenefitsPage } from './pages/BenefitsPage.js';
import { credentials } from './config/credentials.js';

test.describe('E2E-011: Modal Navigation Flow', () => {

    let loginPage;
    let benefitsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        benefitsPage = new BenefitsPage(page);
        
        await loginPage.goto();
        await loginPage.login(credentials.userName, credentials.password);
        await benefitsPage.waitForPageLoad();
    });

    test('should close modal with Cancel button', async ({ page }) => {
        const initialCount = await benefitsPage.getEmployeeCount();
        
        await benefitsPage.clickAddEmployee();
        await benefitsPage.fillEmployeeForm('Test', 'Cancel', 1);
        await benefitsPage.clickCancel();
        
        await benefitsPage.verifyModalHidden();
        
        const finalCount = await benefitsPage.getEmployeeCount();
        expect(finalCount).toBe(initialCount);
    });

    test('should close modal with X button', async ({ page }) => {
        const initialCount = await benefitsPage.getEmployeeCount();
        
        await benefitsPage.clickAddEmployee();
        await benefitsPage.fillEmployeeForm('Test', 'XButton', 1);
        await benefitsPage.closeModalWithX();
        
        await benefitsPage.verifyModalHidden();
        
        const finalCount = await benefitsPage.getEmployeeCount();
        expect(finalCount).toBe(initialCount);
    });

    test('should close modal with ESC key', async ({ page }) => {
        const initialCount = await benefitsPage.getEmployeeCount();
        
        await benefitsPage.clickAddEmployee();
        await benefitsPage.fillEmployeeForm('Test', 'Escape', 1);
        await benefitsPage.closeModalWithEscape();
        
        await benefitsPage.verifyModalHidden();
        
        const finalCount = await benefitsPage.getEmployeeCount();
        expect(finalCount).toBe(initialCount);
    });

    test('should verify no data persisted after all cancel methods', async ({ page }) => {
        // Test that no employees named "Test" with various last names exist
        await benefitsPage.verifyEmployeeNotInTable('Test', 'Cancel');
        await benefitsPage.verifyEmployeeNotInTable('Test', 'XButton');
        await benefitsPage.verifyEmployeeNotInTable('Test', 'Escape');
    });
});
