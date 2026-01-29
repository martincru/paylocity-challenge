# API Test Automation - Quick Start

Python API test suite for Paylocity Benefits API using pytest.

## Prerequisites

- Python 3.8+
- pip

## Setup

1. **Create virtual environment:**

```bash
python -m venv venv
source venv/bin/activate  # macOS/Linux
# venv\Scripts\activate   # Windows
```

2. **Install dependencies:**

```bash
pip install -r requirements.txt
```

3. **Configure credentials:**

```bash
cp .env.example .env
# Edit .env with your credentials
```

## Run Tests

**All tests:**

```bash
pytest
```

**Specific test file:**

```bash
pytest tests/test_employees_crud.py
```

**Specific test:**

```bash
pytest tests/test_employees_crud.py::TestEmployeesCRUD::test_create_employee_success
```

**With detailed output:**

```bash
pytest -v
```

**With HTML report:**

```bash
pytest --html=reports/report.html --self-contained-html
```

## Test Coverage

- **CRUD Operations** - Create, Read, Update, Delete employees
- **Business Logic** - Benefits calculations, salary validations
- **Field Validations** - Required fields, max lengths, ranges
- **Security** - Authentication, invalid credentials

## Project Structure

```
autoAPI/
├── tests/
│   ├── test_employees_crud_1.py      # CRUD operations
│   ├── test_validations_2.py         # Field validations
│   ├── test_business_logic_3.py      # Benefits calculations
│   └── test_security_4.py            # Security tests
├── conftest.py                       # Pytest configuration & fixtures
├── requirements.txt                  # Dependencies
└── .env                              # Credentials (not in git)
```

## Authentication

The API uses Basic Authentication. Configure in `.env`:

```bash
API_USERNAME=your_username
API_PASSWORD=your_password
```

The Basic Auth token is auto-generated from credentials.

