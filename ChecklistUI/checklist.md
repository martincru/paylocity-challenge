# UI Checklist - Paylocity Benefits Dashboard

**Application:** Paylocity Benefits Dashboard  
**URL:** https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login  

---

## Login Page

### Visual Elements

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 1.1 | Paylocity logo visible | ✅ |  |
| 1.2 | "Log In" title clearly visible | ✅ |  |
| 1.3 | "Username" text field present | ✅ |  |
| 1.4 | "Password" text field present (type password) | ✅ |  |
| 1.5 | "Log In" button visible and centered | ✅ |  |
| 1.6 | Footer with copyright visible | ✅ |  |
| 1.7 | "Paylocity Benefits Dashboard" link in header | ✅ |  |

### Functionality

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 1.8 | Username field accepts text input | ✅ |  |
| 1.9 | Password field hides characters | ✅ |  |
| 1.10 | Log In button is clickable | ✅ |  |
| 1.11 | Enter key in password field executes login | ✅ |  |
| 1.12 | Click on Log In button executes login | ✅ |  |
| 1.13 | Valid credentials redirect to /Benefits | ✅ |  |
| 1.14 | Invalid credentials show error | ❌ | BUG-003 |

---

## Benefits Dashboard (Main Page)

### Header/Navigation

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 2.1 | "Paylocity Benefits Dashboard" logo/title visible | ✅ |  |
| 2.2 | "Log Out" link visible in navigation | ✅ |  |
| 2.3 | "Log Out" link is clickable | ✅ |  |

### Employee Table

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 2.4 | "Id" header visible | ✅ |  |
| 2.5 | "Last Name" header visible | ✅ |  |
| 2.6 | "First Name" header visible | ✅ |  |
| 2.7 | "Dependents" header visible | ✅ |  |
| 2.8 | "Salary" header visible | ✅ |  |
| 2.9 | "Gross Pay" header visible | ✅ |  |
| 2.10 | "Benefits Cost" header visible | ✅ |  |
| 2.11 | "Net Pay" header visible | ✅ |  |
| 2.12 | "Actions" header visible | ✅ |  |
| 2.13 | Data rows aligned with headers | ✅ |  |
| 2.14 | Employee IDs (GUID) displayed correctly | ✅ |  |
| 2.15 | Employee names are legible | ✅ |  |
| 2.16 | Numbers formatted with decimals (e.g. 2000.00) | ✅ |  |
| 2.16 | Numbers formatted with $ (Dollar charter) (e.g. $2000.00) | ❌ |  |



### Table Actions

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 2.17 | Edit icon (pencil) visible in each row | ✅ |  |
| 2.18 | Delete icon (X) visible in each row | ✅ |  |

### Add Employee Button

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 2.19 | "Add Employee" button visible below table | ✅ |  |
| 2.20 | Button is clickable | ✅ |  |
| 2.21 | Cursor changes to pointer over button | ✅ |  |
| 2.22 | Hover state visible on button | ✅ |  |

### Footer

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 2.23 | Footer with "© 2026 - Paylocity" visible | ✅ |  |
| 2.24 | Footer remains at bottom | ✅ |  |

---

## Modal: Add Employee

### Modal Structure

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 3.1 | Modal overlays main content | ✅ |  |
| 3.2 | Darkened backdrop behind modal | ✅ |  |
| 3.3 | Modal top centered on screen | ✅ |  |
| 3.4 | Modal borders and shadows visible | ✅ |  |

### Modal Header

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 3.5 | "Add Employee" title visible | ✅ |  |
| 3.6 | "X" close button in top right corner | ✅ |  |
| 3.7 | "X" button is clickable | ✅ |  |
| 3.8 | Header visually separated from body | ✅ |  |

### Form Fields

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 3.8 | "First Name:" label visible | ✅ |  |
| 3.9 | "First Name" text field visible | ✅ |  |
| 3.10 | "Last Name:" label visible | ✅ |  |
| 3.11 | "Last Name" text field visible | ✅ |  |
| 3.12 | "Dependents:" label visible | ✅ |  |
| 3.13 | "Dependents" number field visible | ✅ |  |
| 3.14 | Fields have visible borders | ✅ |  |
| 3.15 | Fields have appropriate size | ✅ |  |
| 3.16 | Labels properly aligned with fields | ✅ |  |

### Field Functionality

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 3.17 | First Name field accepts text input | ✅ |  |
| 3.18 | Last Name field accepts text input | ✅ |  |
| 3.19 | Dependents field accepts only numbers | ❌ | BUG-002 |
| 3.20 | Focus visible on active field | ✅ |  |
| 3.21 | Tab navigates between fields in logical order | ✅ |  |
| 3.22 | Visual indicator for required field (asterisk) | ❌ | BUG-002 |

### Modal Buttons

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 3.23 | "Add" button visible | ✅ |  |
| 3.24 | "Add" button is clickable | ✅ |  |
| 3.25 | "Cancel" button visible | ✅ |  |
| 3.26 | "Cancel" button is clickable | ✅ |  |
| 3.27 | Hover state on buttons | ✅ |  |
| 3.28 | Pointer cursor over buttons | ✅ |  |

### Behavior

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 3.29 | Modal closes on "Cancel" click | ✅ |  |
| 3.30 | Modal closes on "X" click | ✅ |  |
| 3.31 | Modal closes on backdrop click | ✅ |  |
| 3.32 | Modal closes with ESC key | ✅ |  |
| 3.33 | Data saves on "Add" click | ✅ |  |

### Messages and Validation

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 3.42 | Error message visible for invalid fields | ❌ | BUG-002 |
| 3.43 | Error message for negative dependents | ❌ | BUG-002 |
| 3.44 | Error message for text in dependents | ❌ | BUG-002 |
| 3.45 | Visual indicator for field with error (red border) | ❌ | BUG-002 |
| 3.46 | Success message when saving employee | ✅ |  |

---

## Modal: Edit Employee

### Modal Structure

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 4.1 | Modal overlays main content | ✅ |  |
| 4.2 | Darkened backdrop behind modal | ✅ |  |
| 4.3 | Modal top centered on screen | ✅ |  |
| 4.4 | Modal borders and shadows visible | ✅ |  |

### Modal Header

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 4.5 | Title shows "Edit Employee" | ❌ | BUG-005 |
| 4.6 | "X" close button in top right corner | ✅ |  |
| 4.7 | "X" button is clickable | ✅ |  |
| 4.8 | Header visually separated from body | ✅ |  |

### Pre-populated Fields

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 4.9 | First Name field shows current value | ✅ |  |
| 4.10 | Last Name field shows current value | ✅ |  |
| 4.11 | Dependents field shows current value | ✅ |  |
| 4.12 | Values are editable | ✅ |  |

### Field Functionality

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 4.13 | First Name field accepts text input | ✅ |  |
| 4.14 | Last Name field accepts text input | ✅ |  |
| 4.15 | Dependents field accepts only numbers | ❌ | BUG-005 |
| 4.16 | Focus visible on active field | ✅ |  |
| 4.17 | Tab navigates between fields in logical order | ✅ |  |
| 4.18 | Visual indicator for required field (asterisk) | ❌ | BUG-005 |

### Modal Buttons

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 4.19 | Button shows "Update" | ✅ |  |
| 4.20 | "Update" button is clickable | ✅ |  |
| 4.21 | "Cancel" button visible | ✅ |  |
| 4.22 | "Cancel" button is clickable | ✅ |  |
| 4.23 | Hover state on buttons | ✅ |  |
| 4.24 | Pointer cursor over buttons | ✅ |  |

### Behavior

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 4.25 | Modal closes on "Cancel" click | ✅ |  |
| 4.26 | Modal closes on "X" click | ✅ |  |
| 4.27 | Modal closes on backdrop click | ✅ |  |
| 4.28 | Modal closes with ESC key | ✅ |  |
| 4.29 | Changes save on "Update" click | ✅ |  |
| 4.30 | Modal closes after updating | ✅ |  |
| 4.31 | Calculations recalculate automatically | ✅ |  |


### Messages and Validation

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 4.32 | Error message visible for invalid fields | ❌ | BUG-005 |
| 4.33 | Error message for negative dependents | ❌ | BUG-005 |
| 4.34 | Error message for text in dependents | ❌ | BUG-005 |
| 4.35 | Visual indicator for field with error (red border) | ❌ | BUG-005 |
| 4.36 | Success message when saving employee | ✅ |  |

---


## Delete Employee

### Structure

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 5.1 | Confirmation modal visible | ✅ |  |
| 5.2 | Modal top centered on screen | ✅ |  |
| 5.3 | Darkened backdrop behind modal | ✅ |  |

### Content

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 5.4 | "Delete Employee" title visible | ✅ |  |
| 5.5 | "X" close button visible | ✅ |  |
| 5.6 | Confirmation message visible | ✅ |  |
| 5.7 | Message includes employee name | ✅ |  |
| 5.8 | Message text is clear and descriptive | ✅ |  |

### Buttons

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 5.9 | "Delete" button visible | ✅ |  |
| 5.10 | "Cancel" button visible | ✅ |  |
| 5.11 | Delete button has warning color (red) | ✅ |  |
| 5.12 | Buttons are clickable | ✅ |  |

### Behavior

| # | Element | Status | Bug Report |
|---|---------|--------|------------|
| 5.13 | Employee is deleted when confirmed | ✅ |  |
| 5.14 | Row disappears from table | ✅ |  |
| 5.15 | Modal closes when cancelled | ✅ |  |
| 5.16 | Employee remains if cancelled | ✅ |  |

---