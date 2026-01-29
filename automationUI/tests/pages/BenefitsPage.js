import { expect } from '@playwright/test';
import { timeouts } from '../config/credentials.js';

export class BenefitsPage {
    constructor(page) {
        this.page = page;

        // Table elements
        this.employeeTable = page.locator('table');
        this.tableHeaders = page.locator('thead th');
        this.tableRows = page.locator('tbody tr');
        
        // Buttons
        this.addEmployeeButton = page.getByRole('button', { name: 'Add Employee' });
        this.logOutLink = page.getByRole('link', { name: 'Log Out' });
        
        // Modal elements
        this.employeeModal = page.locator('#employeeModal');
        this.deleteModal = page.locator('#deleteModal');
        this.employeeModalTitle = this.employeeModal.locator('.modal-header h5');
        this.deleteModalTitle = this.deleteModal.locator('.modal-header h5');
        this.employeeCloseButton = this.employeeModal.locator('button.close');
        this.deleteCloseButton = this.deleteModal.locator('button.close');
        
        // Form fields
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name:' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name:' });
        this.dependentsInput = page.getByRole('textbox', { name: 'Dependents:' });
        
        // Action buttons in modal
        this.addButton = page.getByRole('button', { name: 'Add', exact: true });
        this.updateButton = page.getByRole('button', { name: 'Update' });
        this.deleteButton = page.getByRole('button', { name: 'Delete' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    }

    async waitForPageLoad() {
        await this.employeeTable.waitFor({ state: 'visible', timeout: timeouts.default });
        await this.page.waitForLoadState('networkidle', { timeout: timeouts.default });
    }

    async verifyOnBenefitsPage() {
        await expect(this.page).toHaveURL(/.*\/Benefits/);
        await expect(this.page).toHaveTitle(/Employees - Paylocity Benefits Dashboard/);
        await expect(this.addEmployeeButton).toBeVisible();
    }

    async clickAddEmployee() {
        await this.addEmployeeButton.click();
        await this.employeeModal.waitFor({ state: 'visible', timeout: timeouts.default });
    }

    async fillEmployeeForm(firstName, lastName, dependents) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.dependentsInput.fill(dependents.toString());
    }

    async clickAdd() {
        await this.addButton.click();
        // Wait for network to settle after adding
        await this.page.waitForLoadState('networkidle', { timeout: timeouts.default }).catch(() => {});
        // Give a bit more time for modal animation
        await this.page.waitForTimeout(1000);
    }

    async clickUpdate() {
        await this.updateButton.click();
        await this.employeeModal.waitFor({ state: 'hidden', timeout: timeouts.default });
    }

    async clickCancel() {
        // This can be called from either employee modal or delete modal
        // Try to determine which is visible
        const employeeModalVisible = await this.employeeModal.isVisible();
        if (employeeModalVisible) {
            await this.cancelButton.click();
            await this.employeeModal.waitFor({ state: 'hidden', timeout: timeouts.default });
        } else {
            await this.cancelButton.click();
            await this.deleteModal.waitFor({ state: 'hidden', timeout: timeouts.default });
        }
    }

    async addEmployee(firstName, lastName, dependents) {
        await this.clickAddEmployee();
        await this.fillEmployeeForm(firstName, lastName, dependents);
        await this.clickAdd();
    }

    async getEmployeeRow(firstName, lastName) {
        // Use first() to get the first matching row (most recent one)
        return this.page.locator(`tr:has-text("${firstName}"):has-text("${lastName}")`).first();
    }

    async getEmployeeRowByIndex(index) {
        return this.tableRows.nth(index);
    }

    async clickEditEmployee(firstName, lastName) {
        const row = await this.getEmployeeRow(firstName, lastName);
        await row.locator('i.fa-edit').click();
        await this.employeeModal.waitFor({ state: 'visible', timeout: timeouts.default });
    }

    async clickDeleteEmployee(firstName, lastName) {
        const row = await this.getEmployeeRow(firstName, lastName);
        await row.locator('i.fa-times').click();
        await this.deleteModal.waitFor({ state: 'visible', timeout: timeouts.default });
    }

    async confirmDelete() {
        await this.deleteButton.click();
        await this.deleteModal.waitFor({ state: 'hidden', timeout: timeouts.default });
    }

    async verifyEmployeeInTable(firstName, lastName, dependents, benefitsCost, netPay) {
        const row = await this.getEmployeeRow(firstName, lastName);
        await expect(row).toBeVisible();
        
        if (dependents !== undefined) {
            await expect(row.locator('td').nth(3)).toHaveText(dependents.toString());
        }
        if (benefitsCost !== undefined) {
            await expect(row.locator('td').nth(6)).toHaveText(benefitsCost);
        }
        if (netPay !== undefined) {
            await expect(row.locator('td').nth(7)).toHaveText(netPay);
        }
    }

    async verifyEmployeeNotInTable(firstName, lastName) {
        const row = this.page.locator(`tr:has-text("${firstName}"):has-text("${lastName}")`);
        await expect(row).toBeHidden();
    }

    async verifyModalTitle(expectedTitle) {
        await expect(this.employeeModalTitle).toHaveText(expectedTitle);
    }

    async verifyModalVisible() {
        await expect(this.employeeModal).toBeVisible();
    }

    async verifyModalHidden() {
        await expect(this.employeeModal).toBeHidden();
    }

    async verifyEmployeeModalVisible() {
        await expect(this.employeeModal).toBeVisible();
    }

    async verifyEmployeeModalHidden() {
        await expect(this.employeeModal).toBeHidden();
    }

    async verifyDeleteModalVisible() {
        await expect(this.deleteModal).toBeVisible();
    }

    async verifyDeleteModalHidden() {
        await expect(this.deleteModal).toBeHidden();
    }

    async verifyDeleteConfirmation(firstName, lastName) {
        await expect(this.deleteModalTitle).toHaveText('Delete Employee');
        await expect(this.deleteModal).toContainText(`${firstName} ${lastName}`);
    }

    async getEmployeeCount() {
        return await this.tableRows.count();
    }

    async logout() {
        await this.logOutLink.click();
        await this.page.waitForURL(/.*\/LogIn/, { timeout: timeouts.default });
    }

    async verifyFormPrePopulated(firstName, lastName, dependents) {
        await expect(this.firstNameInput).toHaveValue(firstName);
        await expect(this.lastNameInput).toHaveValue(lastName);
        await expect(this.dependentsInput).toHaveValue(dependents.toString());
    }

    async verifyGrossPay(row, expectedAmount = '2000.00') {
        await expect(row.locator('td').nth(5)).toHaveText(expectedAmount);
    }

    async closeModalWithX() {
        await this.employeeCloseButton.click();
        await this.employeeModal.waitFor({ state: 'hidden', timeout: timeouts.default });
    }

    async closeModalWithEscape() {
        await this.page.keyboard.press('Escape');
        await this.employeeModal.waitFor({ state: 'hidden', timeout: timeouts.default });
    }

    async closeModalWithBackdrop() {
        // Click outside the modal
        await this.page.locator('.modal-backdrop').click({ position: { x: 0, y: 0 } });
        await this.employeeModal.waitFor({ state: 'hidden', timeout: timeouts.default });
    }
}
