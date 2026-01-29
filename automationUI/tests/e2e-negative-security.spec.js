import { test, expect } from '@playwright/test';
import { urls } from './config/credentials.js';


test.describe('Negative Tests - Security', () => {

    test.describe('NEG-022: Direct URL Access Without Authentication', () => {
        test('should prevent access to dashboard without login', async ({ page, context }) => {
            await test.step('Clear all cookies and storage', async () => {
                await context.clearCookies();
                await context.clearPermissions();
            });
            
            await test.step('Try to access Benefits page directly', async () => {
                await page.goto(urls.benefits);
                await page.waitForLoadState('networkidle');
            });
            
            await test.step('Verify redirect to login or access denied', async () => {

                const currentUrl = page.url();
                await expect(page).toHaveURL(/.*\/LogIn/);
                
            });
        });

    });

});
