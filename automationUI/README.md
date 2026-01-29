# AutoUI - E2E Test Suite with Playwright

Automated end-to-end testing suite for Paylocity Benefits Dashboard application using Playwright.

## 📋 Overview

This project contains automated E2E tests validating:

- Complete login flow
- Employee CRUD operations
- Benefits and deductions calculations
- Data validations
- Security and negative test cases

## Setup

```bash
npm install
npx playwright install
```

## Run Tests

```bash
# All tests
npx playwright test

# UI mode
npx playwright test --ui

# With HTML report
npx playwright test --reporter=html
npx playwright show-report
```

## Structure

- `tests/e2e-*.spec.js` - Test suites (login, CRUD, validations, security)
- `tests/pages/` - Page Object Models
- `tests/config/` - Credentials configuration

## Reports

Reports are auto-generated in `playwright-report/`
