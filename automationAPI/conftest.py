"""
Pytest configuration for API tests
"""
import pytest
import requests
from typing import Generator
import os
import base64
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


@pytest.fixture(scope="session")
def api_base_url() -> str:
    """API base URL"""
    return os.getenv("API_BASE_URL", "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod")


@pytest.fixture(scope="session")
def api_credentials() -> dict:
    """Credentials for authentication"""
    username = os.getenv("API_USERNAME", "TestUser123")
    password = os.getenv("API_PASSWORD", "Test@123")
    
    # Generate Basic token automatically from username and password
    credentials = f"{username}:{password}"
    auth_token = base64.b64encode(credentials.encode()).decode()
    
    return {
        "username": username,
        "password": password,
        "token": auth_token
    }


@pytest.fixture(scope="session")
def api_session(api_credentials) -> Generator[requests.Session, None, None]:
    """HTTP session with authentication configured"""
    session = requests.Session()
    
    # Configure Basic authentication with token
    session.headers.update({
        "Authorization": f"Basic {api_credentials['token']}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    })
    
    yield session
    session.close()


@pytest.fixture
def employee_data() -> dict:
    """Sample data to create an employee"""
    return {
        "firstName": "John",
        "lastName": "Doe",
        "username": "jdoe",
        "dependants": 2,
        "salary": 75000.0
    }


@pytest.fixture
def created_employee(api_session, api_base_url, employee_data):
    """Fixture that creates an employee for use in tests and cleans it up afterwards"""
    # Create employee
    response = api_session.post(f"{api_base_url}/api/Employees", json=employee_data)
    assert response.status_code == 200
    employee = response.json()
    
    yield employee
    
    # Cleanup: delete employee after test
    if "id" in employee:
        try:
            api_session.delete(f"{api_base_url}/api/Employees/{employee['id']}")
        except:
            pass  # Ignore cleanup errors


def pytest_html_report_title(report):
    """Customize HTML report title"""
    report.title = "Test Report - Paylocity Benefits API"
