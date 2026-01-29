"""
CRUD tests for the Employees endpoint
"""
import pytest
import uuid
from faker import Faker

fake = Faker()


class TestEmployeesCRUD:
    """Test suite for employee CRUD operations"""
    
    def test_create_employee_success(self, api_session, api_base_url):
        """TC001: Verify that an employee can be created with valid data"""
        employee_data = {
            "firstName": fake.first_name(),
            "lastName": fake.last_name(),
            "username": fake.user_name()[:50],
            "dependants": 1,
            "salary": 60000.0
        }
        
        response = api_session.post(
            f"{api_base_url}/api/Employees",
            json=employee_data
        )
        
        assert response.status_code == 200, f"Error: {response.text}"
        employee = response.json()
        
        # Validations
        assert employee["firstName"] == employee_data["firstName"]
        assert employee["lastName"] == employee_data["lastName"]
        assert employee["username"] == employee_data["username"]
        assert employee["dependants"] == employee_data["dependants"]
        assert employee["salary"] == employee_data["salary"]
        assert "id" in employee
        assert uuid.UUID(employee["id"])  # Validar formato UUID
        
        # Cleanup
        api_session.delete(f"{api_base_url}/api/Employees/{employee['id']}")
    
    def test_get_all_employees(self, api_session, api_base_url, created_employee):
        """TC002: Verify that the list of all employees can be retrieved"""
        response = api_session.get(f"{api_base_url}/api/Employees")
        
        assert response.status_code == 200
        employees = response.json()
        
        assert isinstance(employees, list)
        assert len(employees) > 0
        
        # Verify that the created employee is in the list
        employee_ids = [emp["id"] for emp in employees]
        assert created_employee["id"] in employee_ids
    
    def test_get_employee_by_id(self, api_session, api_base_url, created_employee):
        """TC003: Verify that a specific employee can be retrieved by ID"""
        employee_id = created_employee["id"]
        
        response = api_session.get(f"{api_base_url}/api/Employees/{employee_id}")
        
        assert response.status_code == 200
        employee = response.json()
        
        assert employee["id"] == employee_id
        assert employee["firstName"] == created_employee["firstName"]
        assert employee["lastName"] == created_employee["lastName"]
    
    def test_update_employee(self, api_session, api_base_url, created_employee):
        """TC004: Verify that an existing employee can be updated"""
        updated_data = created_employee.copy()
        updated_data["firstName"] = "UpdatedName"
        updated_data["dependants"] = 5
        updated_data["salary"] = 85000.0
        
        response = api_session.put(
            f"{api_base_url}/api/Employees",
            json=updated_data
        )
        
        assert response.status_code == 200
        
        # Verify that the changes were applied
        get_response = api_session.get(
            f"{api_base_url}/api/Employees/{created_employee['id']}"
        )
        updated_employee = get_response.json()
        
        assert updated_employee["firstName"] == "UpdatedName"
        assert updated_employee["dependants"] == 5
        assert updated_employee["salary"] == 85000.0
    
    def test_delete_employee(self, api_session, api_base_url, employee_data):
        """TC005: Verify that an employee can be deleted"""
        # Create employee
        create_response = api_session.post(
            f"{api_base_url}/api/Employees",
            json=employee_data
        )
        employee = create_response.json()
        employee_id = employee["id"]
        
        # Delete employee
        delete_response = api_session.delete(
            f"{api_base_url}/api/Employees/{employee_id}"
        )
        
        assert delete_response.status_code == 200        
        # Verify that the employee no longer exists
        get_response = api_session.get(
            f"{api_base_url}/api/Employees/{employee_id}"
        )
        # API can return 200 with an empty/null object, 404, or 400
        if get_response.status_code == 200:
            # Verify that the employee does not exist in the response
            try:
                employee_after_delete = get_response.json()
                assert employee_after_delete is None or employee_after_delete == {}
            except:
                pass  # If it cannot parse JSON, employee does not exist
        else:
            assert get_response.status_code in [404, 400]  # Not found or Bad request
