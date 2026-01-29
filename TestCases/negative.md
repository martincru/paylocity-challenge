## ❌ Negative Test Cases Login

### NEG-001: Login with Invalid Username

**Priority:** High  
**Type:** Negative

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify system rejects invalid username |
| **Preconditions** | User on login page |
| **Test Steps** | 1. Enter username: "InvalidUser123"<br>2. Enter password: "C{fjr$)KGY&%"<br>3. Click "Log In" |
| **Expected Result** | Error message displayed, user remains on login page |
| **Actual Result** | ❌ FAIL - No visible error message |
| **Test Data** | Username: InvalidUser123 |
| **Status** | ❌ FAIL BUG-003|

---

### NEG-002: Login with Invalid Password

**Priority:** High  
**Type:** Negative

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify system rejects invalid password |
| **Preconditions** | User on login page |
| **Test Steps** | 1. Enter username: "TestUser877"<br>2. Enter password: "WrongPassword"<br>3. Click "Log In" |
| **Expected Result** | Error message displayed, user remains on login page |
| **Actual Result** | ❌ FAIL - No visible error message |
| **Test Data** | Password: WrongPassword |
| **Status** | ❌ FAIL BUG-003 |

---

### NEG-003: Login with Empty Credentials

**Priority:** High  
**Type:** Negative

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify system prevents login with empty fields |
| **Preconditions** | User on login page |
| **Test Steps** | 1. Leave username empty<br>2. Leave password empty<br>3. Click "Log In" |
| **Expected Result** | HTML5 validation prevents form submission or error message shown |
| **Actual Result** | HTML5 validation works |
| **Test Data** | Empty fields |
| **Status** | ✅ PASS |

---

## ❌ Negative Test Cases Employees

### NEG-001: Add Employee - Empty First Name

**Priority:** High  
**Type:** Negative

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify required field validation for First Name |
| **Preconditions** | Add Employee modal open |
| **Test Steps** | 1. Leave First Name empty<br>2. Enter Last Name: "Test"<br>3. Enter Dependents: "0"<br>4. Click "Add" |
| **Expected Result** | Validation error shown, employee not created |
| **Actual Result** | Any message is shown |
| **Test Data** | FirstName: (empty) |
| **Status** | ❌ FAIL BUG-002 |

---

### NEG-002: Add Employee - Empty Last Name

**Priority:** High  
**Type:** Negative

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify required field validation for Last Name |
| **Preconditions** | Add Employee modal open |
| **Test Steps** | 1. Enter First Name: "Test"<br>2. Leave Last Name empty<br>3. Enter Dependents: "0"<br>4. Click "Add" |
| **Expected Result** | Validation error shown, employee not created |
| **Actual Result** | Any message is shown |
| **Test Data** | LastName: (empty) |
| **Status** | ❌ FAIL BUG-002 |

---

### NEG-003: Add Employee - Empty Dependents

**Priority:** High  
**Type:** Negative

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify required field validation for Dependents |
| **Preconditions** | Add Employee modal open |
| **Test Steps** | 1. Enter First Name: "Test"<br>2. Enter Last Name: "User"<br>3. Leave Dependents empty<br>4. Click "Add" |
| **Expected Result** | Validation error shown, employee not created |
| **Actual Result** | Any message is shown |
| **Test Data** | Dependents: (empty) |
| **Status** | ❌ FAIL  BUG-002|

---

### NEG-004: Add Employee - Negative Dependents

**Priority:** Critical  
**Type:** Negative

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify system rejects negative dependent count |
| **Preconditions** | Add Employee modal open |
| **Test Steps** | 1. Enter First Name: "Test"<br>2. Enter Last Name: "User"<br>3. Enter Dependents: "-1"<br>4. Click "Add" |
| **Expected Result** | Clear error message: "Dependents must be 0 or greater" |
| **Actual Result** | ❌ FAIL - Server rejects but no visible error message |
| **Test Data** | Dependents: -1 |
| **Status** | ❌ FAIL - BUG-002 |

---

### NEG-005: Add Employee - Text in Dependents

**Priority:** Critical  
**Type:** Negative

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify system rejects non-numeric dependents |
| **Preconditions** | Add Employee modal open |
| **Test Steps** | 1. Enter First Name: "Test"<br>2. Enter Last Name: "User"<br>3. Enter Dependents: "abc"<br>4. Click "Add" |
| **Expected Result** | Clear error message: "Please enter a valid number" |
| **Actual Result** | ❌ FAIL - Server rejects but no visible error message (BUG #2) |
| **Test Data** | Dependents: abc |
| **Status** | ❌ FAIL - BUG-002 |

---

### NEG-006: Add Employee - Decimal Dependents

**Priority:** High  
**Type:** Negative

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify system handles decimal dependent count |
| **Preconditions** | Add Employee modal open |
| **Test Steps** | 1. Enter First Name: "Test"<br>2. Enter Last Name: "User"<br>3. Enter Dependents: "1.5"<br>4. Click "Add" |
| **Expected Result** | Either reject with error OR show warning about rounding |
| **Actual Result** | ❌ FAIL - Silently rounds to 1 without notification (BUG #3) |
| **Test Data** | Dependents: 1.5 |
| **Status** | ❌ FAIL - BUG-002 |

---

### NEG-007: Add Employee - Special Characters in Name

**Priority:** Medium  
**Type:** Negative

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify system handles special characters |
| **Preconditions** | Add Employee modal open |
| **Test Steps** | 1. Enter First Name: "Test@#$"<br>2. Enter Last Name: "User!@#"<br>3. Enter Dependents: "0"<br>4. Click "Add" |
| **Expected Result** | Either accept (if allowed) OR show validation error |
| **Actual Result** | System accepts special characters |
| **Test Data** | Special characters in names |
| **Status** | ⚠️ NEEDS CLARIFICATION BUG-002 |

---

### NEG-008: Add Employee - FirstName Exceeds 50 Characters

**Priority:** High  
**Type:** Negative

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify FirstName field enforces 50 character maximum |
| **Preconditions** | Add Employee modal open |
| **Test Steps** | 1. Enter First Name: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" (51 chars)<br>2. Enter Last Name: "Test"<br>3. Enter Dependents: "0"<br>4. Click "Add" |
| **Expected Result** | Validation error: "The field FirstName must be a string with a maximum length of 50" |
| **Actual Result** | HTML5 maxlength="50" prevents input OR server validation error shown |
| **Test Data** | FirstName: 51 characters |
| **Status** | ⚠️ NEEDS VERIFICATION |

---

### NEG-009: Add Employee - LastName Exceeds 50 Characters

**Priority:** High  
**Type:** Negative

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify LastName field enforces 50 character maximum |
| **Preconditions** | Add Employee modal open |
| **Test Steps** | 1. Enter First Name: "Test"<br>2. Enter Last Name: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" (51 chars)<br>3. Enter Dependents: "0"<br>4. Click "Add" |
| **Expected Result** | Validation error: "The field LastName must be a string with a maximum length of 50" |
| **Actual Result** | HTML5 maxlength="50" prevents input OR server validation error shown |
| **Test Data** | LastName: 51 characters |
| **Status** | ⚠️ NEEDS VERIFICATION |

---

### NEG-010: Add Employee - FirstName Exactly 50 Characters

**Priority:** Medium  
**Type:** Negative - Boundary

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify FirstName accepts exactly 50 characters (valid boundary) |
| **Preconditions** | Add Employee modal open |
| **Test Steps** | 1. Enter First Name: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqr" (exactly 50 chars)<br>2. Enter Last Name: "Test"<br>3. Enter Dependents: "0"<br>4. Click "Add" |
| **Expected Result** | Employee created successfully |
| **Actual Result** | Should accept 50 characters |
| **Test Data** | FirstName: 50 characters (max valid) |
| **Status** | ⚠️ NEEDS VERIFICATION |

---

### NEG-011: Add Employee - LastName Exactly 50 Characters

**Priority:** Medium  
**Type:** Negative - Boundary

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify LastName accepts exactly 50 characters (valid boundary) |
| **Preconditions** | Add Employee modal open |
| **Test Steps** | 1. Enter First Name: "Test"<br>2. Enter Last Name: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqr" (exactly 50 chars)<br>3. Enter Dependents: "0"<br>4. Click "Add" |
| **Expected Result** | Employee created successfully |
| **Actual Result** | Should accept 50 characters |
| **Test Data** | LastName: 50 characters (max valid) |
| **Status** | ⚠️ NEEDS VERIFICATION |

---

### NEG-012: Add Employee - Dependents Exceeds Maximum (33)

**Priority:** High  
**Type:** Negative

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify Dependents field enforces maximum of 32 |
| **Preconditions** | Add Employee modal open |
| **Test Steps** | 1. Enter First Name: "Test"<br>2. Enter Last Name: "User"<br>3. Enter Dependents: "33"<br>4. Click "Add" |
| **Expected Result** | Validation error: "The field Dependants must be between 0 and 32" |
| **Actual Result** | Server validation should reject |
| **Test Data** | Dependents: 33 |
| **Status** | ⚠️ NEEDS VERIFICATION |

---

### NEG-013: Add Employee - Dependents at Maximum (32)

**Priority:** Medium  
**Type:** Negative - Boundary

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify Dependents accepts exactly 32 (valid boundary) |
| **Preconditions** | Add Employee modal open |
| **Test Steps** | 1. Enter First Name: "Test"<br>2. Enter Last Name: "User"<br>3. Enter Dependents: "32"<br>4. Click "Add" |
| **Expected Result** | Employee created successfully with Benefits Cost = $653.85 |
| **Actual Result** | Should accept 32 dependents |
| **Test Data** | Dependents: 32 (max valid) |
| **Status** | ⚠️ NEEDS VERIFICATION |

---

### NEG-014: Add Employee - Dependents Far Above Maximum (999)

**Priority:** Medium  
**Type:** Negative

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify system rejects extremely high dependent counts |
| **Preconditions** | Add Employee modal open |
| **Test Steps** | 1. Enter First Name: "Test"<br>2. Enter Last Name: "User"<br>3. Enter Dependents: "999"<br>4. Click "Add" |
| **Expected Result** | Validation error: "The field Dependants must be between 0 and 32" |
| **Actual Result** | Server validation should reject |
| **Test Data** | Dependents: 999 |
| **Status** | ⚠️ NEEDS VERIFICATION |

---

### NEG-015: Edit Employee - Negative Dependents

**Priority:** Critical  
**Type:** Negative

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify edit validation for negative dependents |
| **Preconditions** | Employee exists, Edit modal open |
| **Test Steps** | 1. Open edit modal<br>2. Change Dependents to "-5"<br>3. Click "Update" |
| **Expected Result** | Validation error: "The field Dependants must be between 0 and 32" |
| **Actual Result** | ❌ FAIL - No visible error message |
| **Test Data** | Dependents: -5 |
| **Status** | ❌ FAIL - BUG-005 |

---

### NEG-016: Edit Employee - Dependents Exceeds Maximum (33)

**Priority:** High  
**Type:** Negative

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify edit validation enforces maximum of 32 dependents |
| **Preconditions** | Employee exists, Edit modal open |
| **Test Steps** | 1. Open edit modal<br>2. Change Dependents to "33"<br>3. Click "Update" |
| **Expected Result** | Validation error: "The field Dependants must be between 0 and 32" |
| **Actual Result** | Server validation should reject |
| **Test Data** | Dependents: 33 |
| **Status** | ⚠️ NEEDS VERIFICATION |

---

### NEG-017: Edit Employee - FirstName Exceeds 50 Characters

**Priority:** High  
**Type:** Negative

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify edit validation enforces 50 character max for FirstName |
| **Preconditions** | Employee exists, Edit modal open |
| **Test Steps** | 1. Open edit modal<br>2. Change First Name to 51+ characters<br>3. Click "Update" |
| **Expected Result** | Validation error: "The field FirstName must be a string with a maximum length of 50" |
| **Actual Result** | HTML5 maxlength OR server validation should prevent |
| **Test Data** | FirstName: 51 characters |
| **Status** | ⚠️ NEEDS VERIFICATION |

---

### NEG-018: Edit Employee - LastName Exceeds 50 Characters

**Priority:** High  
**Type:** Negative

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify edit validation enforces 50 character max for LastName |
| **Preconditions** | Employee exists, Edit modal open |
| **Test Steps** | 1. Open edit modal<br>2. Change Last Name to 51+ characters<br>3. Click "Update" |
| **Expected Result** | Validation error: "The field LastName must be a string with a maximum length of 50" |
| **Actual Result** | HTML5 maxlength OR server validation should prevent |
| **Test Data** | LastName: 51 characters |
| **Status** | ⚠️ NEEDS VERIFICATION |

---

### NEG-019: Edit Employee - Text in Dependents

**Priority:** Critical  
**Type:** Negative

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify edit validation for non-numeric dependents |
| **Preconditions** | Employee exists, Edit modal open |
| **Test Steps** | 1. Open edit modal<br>2. Change Dependents to "xyz"<br>3. Click "Update" |
| **Expected Result** | Clear error message displayed |
| **Actual Result** | ❌ FAIL - No visible error message |
| **Test Data** | Dependents: xyz |
| **Status** | ❌ FAIL - BUG-005 |

---

### NEG-020: Edit Employee - Decimal Dependents

**Priority:** High  
**Type:** Negative

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify edit validation for decimal dependents |
| **Preconditions** | Employee exists, Edit modal open |
| **Test Steps** | 1. Open edit modal<br>2. Change Dependents to "2.7"<br>3. Click "Update" |
| **Expected Result** | Either reject OR show rounding warning |
| **Actual Result** | ❌ FAIL - Silently rounds BUG-005 |
| **Test Data** | Dependents: 2.7 |
| **Status** | ❌ FAIL - BUG-005 |

---

### NEG-021: Edit Employee Clearing Required Fields

**Priority:** High  
**Type:** Negative

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify required fields enforced in edit |
| **Preconditions** | Employee exists, Edit modal open |
| **Test Steps** | 1. Open edit modal<br>2. Clear First Name field<br>3. Click "Update" |
| **Expected Result** | Validation prevents update |
| **Actual Result** | Any message is shown |
| **Test Data** | Empty required field |
| **Status** | ❌ FAIL BUG-005|

---

### NEG-022: Direct URL Access Without Authentication

**Priority:** Critical  
**Type:** Negative - Security

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify authentication required for dashboard |
| **Preconditions** | User not authenticated |
| **Test Steps** | 1. Open new browser/incognito window<br>2. Navigate directly to /Benefits URL<br>3. Observe result |
| **Expected Result** | Redirect to login page, access denied |
| **Actual Result** | It is posible view the dashboard without login |
| **Test Data** | Direct URL access |
| **Status** | ❌ FAIL  BUG-004 |

---


**Priority:** Low  
**Type:** Negative

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify system handles Unicode/international characters |
| **Preconditions** | Add Employee modal open |
| **Test Steps** | 1. Enter First Name: "José"<br>2. Enter Last Name: "Müller"<br>3. Enter Dependents: "0"<br>4. Click "Add"<br>5. Verify data displays correctly |
| **Expected Result** | Unicode characters accepted and displayed correctly |
| **Actual Result** | Should support international characters |
| **Test Data** | Unicode: José, Müller, 李明 |
| **Status** | ⚠️ NEEDS VERIFICATION |

---