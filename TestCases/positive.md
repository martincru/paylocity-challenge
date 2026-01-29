# End-to-End and Negative Test Cases - Paylocity Benefits Dashboard

## End-to-End Test Cases

### E2E-001: Complete Login to Dashboard Flow

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify complete login flow from credentials entry to dashboard display |
| **Preconditions** | User has valid credentials: TestUser877 / C{fjr$)KGY&% |
| **Test Steps** | 1. Navigate to login URL<br>2. Enter username: "TestUser877"<br>3. Enter password: "C{fjr$)KGY&%"<br>4. Click "Log In" button<br>5. Verify redirection to /Benefits page |
| **Expected Result** | User successfully authenticated and redirected to Benefits Dashboard with employee table visible |
| **Test Data** | Username: TestUser877<br>Password: C{fjr$)KGY&% |
| **Status** | ✅ PASS |

---

### E2E-002: Add Employee (No Dependents)

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify complete employee creation flow from opening modal to data persistence |
| **Preconditions** | User authenticated and on Benefits Dashboard |
| **Test Steps** | 1. Click "Add Employee" button<br>2. Verify modal opens with empty form<br>3. Enter First Name: "John"<br>4. Enter Last Name: "Doe"<br>5. Enter Dependents: "0"<br>6. Click "Add" button<br>7. Verify modal closes<br>8. Verify new row appears in table<br>9. Verify calculations: Benefits Cost = $38.46, Net Pay = $1,961.54 |
| **Expected Result** | Employee created successfully with correct data and calculations displayed in table |
| **Test Data** | FirstName: John<br>LastName: Doe<br>Dependents: 0 |
| **Status** | ✅ PASS |

---

### E2E-003: Add Employee (Multiple Dependents)

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify employee creation with multiple dependents and correct calculations |
| **Preconditions** | User authenticated and on Benefits Dashboard |
| **Test Steps** | 1. Click "Add Employee" button<br>2. Enter First Name: "Maria"<br>3. Enter Last Name: "Garcia"<br>4. Enter Dependents: "3"<br>5. Click "Add" button<br>6. Verify modal closes<br>7. Verify new row in table<br>8. Verify calculations: Benefits Cost = $96.15, Net Pay = $1,903.85 |
| **Expected Result** | Employee with 3 dependents created with correct benefit calculations |
| **Test Data** | FirstName: Maria<br>LastName: Garcia<br>Dependents: 3 |
| **Status** | ✅ PASS |

---

### E2E-004: Edit Employee

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify complete employee edit flow including data updates and recalculations |
| **Preconditions** | Employee "John Doe" exists with 0 dependents |
| **Test Steps** | 1. Click edit icon (pencil) for employee<br>2. Verify modal opens with pre-populated data<br>3. Verify title shows "Edit Employee" (currently fails - BUG #1)<br>4. Change First Name to "Jonathan"<br>5. Change Dependents to "2"<br>6. Click "Update" button<br>7. Verify modal closes<br>8. Verify row updates with new data<br>9. Verify recalculations: Benefits Cost = $76.92, Net Pay = $1,923.08 |
| **Expected Result** | Employee data updated and calculations recalculated correctly |
| **Test Data** | Original: John Doe, 0 dependents<br>Updated: Jonathan Doe, 2 dependents |
| **Status** | ✅ PASS |

---

### E2E-005: Delete Employee

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify complete employee deletion flow with confirmation |
| **Preconditions** | Employee "Maria Garcia" exists in table |
| **Test Steps** | 1. Click delete icon (X) for employee<br>2. Verify confirmation modal appears<br>3. Verify modal shows "Delete Employee" title<br>4. Verify message includes employee name<br>5. Click "Delete" button<br>6. Verify modal closes<br>7. Verify employee row removed from table<br>8. Verify other employees remain unchanged |
| **Expected Result** | Employee successfully deleted from system and table |
| **Test Data** | Employee: Maria Garcia |
| **Status** | ✅ PASS |

---

### E2E-006: Cancel Delete Employee Flow

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify canceling deletion preserves employee data |
| **Preconditions** | Employee exists in table |
| **Test Steps** | 1. Click delete icon (X) for employee<br>2. Verify confirmation modal appears<br>3. Click "Cancel" button<br>4. Verify modal closes<br>5. Verify employee still exists in table<br>6. Verify no data changed |
| **Expected Result** | Deletion cancelled, employee remains in system |
| **Test Data** | Any existing employee |
| **Status** | ✅ PASS |

---

### E2E-007: Add, Edit, Delete Full Lifecycle

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify complete CRUD lifecycle for an employee |
| **Preconditions** | User authenticated and on Benefits Dashboard |
| **Test Steps** | 1. **CREATE:** Add new employee "Test User" with 1 dependent<br>2. Verify employee appears with Benefits Cost = $57.69<br>3. **READ:** Verify employee data displayed correctly<br>4. **UPDATE:** Edit to 3 dependents<br>5. Verify Benefits Cost updates to $96.15<br>6. **DELETE:** Delete the employee<br>7. Verify employee removed from table |
| **Expected Result** | Complete lifecycle executes without errors, calculations correct at each step |
| **Test Data** | Create: Test User, 1 dependent<br>Update: 3 dependents<br>Delete: Test User |
| **Status** | ✅ PASS |

---

### E2E-008: Multiple Employees Management

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify system handles multiple employees correctly |
| **Preconditions** | User authenticated and on Benefits Dashboard |
| **Test Steps** | 1. Add Employee 1: "Alice Smith", 0 dependents<br>2. Add Employee 2: "Bob Johnson", 2 dependents<br>3. Add Employee 3: "Carol Williams", 5 dependents<br>4. Verify all 3 employees in table<br>5. Verify each has correct calculations<br>6. Edit Employee 2 to 1 dependent<br>7. Delete Employee 3<br>8. Verify table shows 2 employees with correct data |
| **Expected Result** | System correctly manages multiple employees with independent calculations |
| **Test Data** | Multiple employees with varying dependents |
| **Status** | ✅ PASS |

---

### E2E-009: Login and Logout Complete Flow

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify complete authentication cycle |
| **Preconditions** | User has valid credentials |
| **Test Steps** | 1. Navigate to login page<br>2. Enter valid credentials<br>3. Click "Log In"<br>4. Verify redirect to /Benefits<br>5. Click "Log Out" link<br>6. Verify redirect to login page<br>7. Attempt to navigate to /Benefits<br>8. Verify redirect back to login (session ended) |
| **Expected Result** | Complete authentication cycle works, session properly terminated |
| **Test Data** | Valid credentials |
| **Status** | ✅ PASS |

---

### E2E-010: Calculations Validation Across Operations

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify benefit calculations remain accurate through all operations |
| **Preconditions** | User authenticated |
| **Test Steps** | 1. Add employee with 0 dependents → Verify $38.46<br>2. Add employee with 1 dependent → Verify $57.69<br>3. Add employee with 2 dependents → Verify $76.92<br>4. Edit first employee to 3 dependents → Verify $96.15<br>5. Edit second employee to 0 dependents → Verify $38.46<br>6. Verify Gross Pay always = $2,000.00<br>7. Verify Net Pay = Gross Pay - Benefits Cost |
| **Expected Result** | All calculations accurate using formula: (1000 + dependents × 500) / 26 |
| **Test Data** | Various dependent counts: 0, 1, 2, 3 |
| **Status** | ✅ PASS |

---

### E2E-011: Modal Navigation Flow

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify all modal interaction methods work correctly |
| **Preconditions** | User on Benefits Dashboard |
| **Test Steps** | 1. Open Add Employee modal<br>2. Close with "Cancel" button<br>3. Open Add Employee modal<br>4. Close with "X" button<br>5. Open Add Employee modal<br>6. Close with backdrop click<br>7. Open Add Employee modal<br>8. Close with ESC key<br>9. Verify table unchanged after each cancel |
| **Expected Result** | All modal close methods work, no data persisted when cancelled |
| **Test Data** | N/A |
| **Status** | ✅ PASS |

---

### E2E-012: Tab Navigation Flow

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify keyboard navigation through form fields |
| **Preconditions** | Add Employee modal open |
| **Test Steps** | 1. Focus on First Name field<br>2. Press Tab → verify focus on Last Name<br>3. Press Tab → verify focus on Dependents<br>4. Press Tab → verify focus on Add button<br>5. Press Tab → verify focus on Cancel button<br>6. Enter data using only keyboard<br>7. Press Enter on Add button<br>8. Verify employee added |
| **Expected Result** | Complete form submission possible using only keyboard |
| **Test Data** | FirstName: Keyboard, LastName: User, Dependents: 1 |
| **Status** | ✅ PASS |

---

### E2E-013: Data Persistence After Refresh

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify data persists after page refresh |
| **Preconditions** | User authenticated with employees in table |
| **Test Steps** | 1. Add new employee "Refresh Test" with 2 dependents<br>2. Note employee ID and data<br>3. Refresh browser (F5)<br>4. Verify redirect to login page<br>5. Login again<br>6. Verify employee "Refresh Test" still exists<br>7. Verify all data intact with correct calculations |
| **Expected Result** | Data persists in backend, available after re-authentication |
| **Test Data** | FirstName: Refresh, LastName: Test, Dependents: 2 |
| **Status** | ✅ PASS |

---

### E2E-014: Complete Workflow Validation

| Field | Description |
|-------|-------------|
| **Test Objective** | Verify typical employer workflow end-to-end |
| **Preconditions** | Clean state, user not authenticated |
| **Test Steps** | 1. Navigate to application<br>2. Login with credentials<br>3. View existing employees and benefits costs<br>4. Add 2 new employees with different dependents<br>5. Verify preview of benefit costs for each<br>6. Edit one employee's dependent count<br>7. Verify costs recalculate<br>8. Remove one employee<br>9. Verify final roster and total costs<br>10. Logout |
| **Expected Result** | Complete employer workflow successful, all benefit calculations accurate |
| **Test Data** | Multiple employees, various scenarios |
| **Status** | ✅ PASS |

---