# The 'username' field is overwritten with the authenticated user when creating employees via POST /api/Employees

## Bug Information

**Affected Endpoint:** `POST https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/Employees`

**Description:** The API ignores the `username` field sent in the POST request and automatically overwrites it with the authenticated user's name (Basic Auth).

---

## Steps to Reproduce the Error

1. Authenticate with valid credentials (username: `TestUser877`)
2. Send a POST request to the `/api/Employees` endpoint with the following payload:
   ```json
   {
     "firstName": "John",
     "lastName": "Doe",
     "username": "jdoe",
     "dependants": 1,
     "salary": 60000.0
   }
   ```
3. Observe the API response
4. Verify the `username` field in the response

### Code to Reproduce:

```python
import requests
import base64

# Authentication
username = 'TestUser877'
password = 'C{fjr$)KGY&%'
token = base64.b64encode(f'{username}:{password}'.encode()).decode()

session = requests.Session()
session.headers.update({
    'Authorization': f'Basic {token}',
    'Content-Type': 'application/json'
})

# Create employee with username "jdoe"
employee_data = {
    "firstName": "John",
    "lastName": "Doe",
    "username": "jdoe",  # ← We send this username
    "dependants": 1,
    "salary": 60000.0
}

response = session.post(
    'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/Employees',
    json=employee_data
)

print(response.json()['username'])  # Prints: "TestUser877"
```

---

## Expected Result

The API should:
1. Accept the `username` field sent in the payload
2. Create the employee with the specified username (`jdoe`)
3. Return a response with the same username:

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "firstName": "John",
  "lastName": "Doe",
  "username": "jdoe",  // ← Should be the sent username
  "dependants": 1,
  "salary": 60000.0,
  "gross": 2307.6923,
  "benefitsCost": 57.692303,
  "net": 2250.0
}
```

---

## Actual Result

The API:
1. **Ignores** the `username` field sent in the payload
2. **Overwrites** the username with the authenticated user's name (`TestUser877`)
3. Returns a response with the authenticated user's username:

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "firstName": "John",
  "lastName": "Doe",
  "username": "TestUser877",  // ← Overwritten with authenticated user
  "dependants": 1,
  "salary": 60000.0,
  "gross": 2307.6923,
  "benefitsCost": 57.692303,
  "net": 2250.0
}
```

## Evidence

### Failing Automated Test:

**File:** `tests/test_employees_crud_1.py`  
**Test:** `test_create_employee_success`  
**Line:** 35

```python
assert employee["username"] == employee_data["username"]
# AssertionError: assert 'TestUser877' == 'gprice'
#   - gprice
#   + TestUser877
```

### Test Execution:

```bash
$ pytest tests/test_employees_crud_1.py::TestEmployeesCRUD::test_create_employee_success -v

FAILED tests/test_employees_crud_1.py::TestEmployeesCRUD::test_create_employee_success
AssertionError: assert 'TestUser877' == 'gprice'
```

