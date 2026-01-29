"""
Field validation and business rules tests
"""
import pytest
from faker import Faker

fake = Faker()


class TestFieldValidations:
    """Required fields and format validation tests"""
    
    def test_create_employee_missing_firstname(self, api_session, api_base_url):
        """TC006: Verify that employee cannot be created without firstName"""
        employee_data = {
            "lastName": "Doe",
            "username": "jdoe123"
        }
        
        response = api_session.post(
            f"{api_base_url}/api/Employees",
            json=employee_data
        )
        
        assert response.status_code in [400, 422]  # Bad Request o Unprocessable Entity
    
    def test_create_employee_missing_lastname(self, api_session, api_base_url):
        """TC007: Verify that employee cannot be created without lastName"""
        employee_data = {
            "firstName": "John",
            "username": "jdoe123"
        }
        
        response = api_session.post(
            f"{api_base_url}/api/Employees",
            json=employee_data
        )
        
        assert response.status_code in [400, 422]
    
    def test_create_employee_missing_username(self, api_session, api_base_url):
        """TC008: Verify that employee cannot be created without username"""
        employee_data = {
            "firstName": "Mario",
            "lastName": "Canicas"
        }
        
        response = api_session.post(
            f"{api_base_url}/api/Employees",
            json=employee_data
        )
        
        assert response.status_code in [400, 422]
    
    def test_create_employee_firstname_too_long(self, api_session, api_base_url):
        """TC009: Verify firstName maximum length validation (50 characters)"""
        employee_data = {
            "firstName": "A" * 51,  # More than 50 characters
            "lastName": "Doe",
            "username": "jdoe123"
        }
        
        response = api_session.post(
            f"{api_base_url}/api/Employees",
            json=employee_data
        )
        
        assert response.status_code in [400, 422]
    
    def test_create_employee_lastname_too_long(self, api_session, api_base_url):
        """TC010: Verify lastName maximum length validation (50 characters)"""
        employee_data = {
            "firstName": "John",
            "lastName": "D" * 51,  # More than 50 characters
            "username": "jdoe123"
        }
        
        response = api_session.post(
            f"{api_base_url}/api/Employees",
            json=employee_data
        )
        
        assert response.status_code in [400, 422]
    
    def test_create_employee_username_too_long(self, api_session, api_base_url):
        """TC011: Verify username maximum length validation (50 characters)"""
        employee_data = {
            "firstName": "John",
            "lastName": "Doe",
            "username": "u" * 51  # More than 50 characters
        }
        
        response = api_session.post(
            f"{api_base_url}/api/Employees",
            json=employee_data
        )
        
        assert response.status_code in [400, 422]
    
    def test_create_employee_dependants_negative(self, api_session, api_base_url):
        """TC012: Verify that dependants cannot be negative"""
        employee_data = {
            "firstName": "John",
            "lastName": "Doe",
            "username": "jdoe123",
            "dependants": -1
        }
        
        response = api_session.post(
            f"{api_base_url}/api/Employees",
            json=employee_data
        )
        
        assert response.status_code in [400, 422]
    
    def test_create_employee_dependants_exceeds_max(self, api_session, api_base_url):
        """TC013: Verify that dependants cannot exceed 32"""
        employee_data = {
            "firstName": "John",
            "lastName": "Doe",
            "username": "jdoe123",
            "dependants": 33
        }
        
        response = api_session.post(
            f"{api_base_url}/api/Employees",
            json=employee_data
        )
        
        assert response.status_code in [400, 422]
    
    def test_get_employee_invalid_uuid(self, api_session, api_base_url):
        """TC014: Verify that ID UUID format is validated"""
        invalid_id = "invalid-uuid-format"
        
        response = api_session.get(
            f"{api_base_url}/api/Employees/{invalid_id}"
        )
        
        assert response.status_code in [400, 404]
    
    def test_delete_employee_nonexistent(self, api_session, api_base_url):
        """TC015: Verify handling of attempt to delete non-existent employee"""
        nonexistent_id = "00000000-0000-0000-0000-000000000000"
        
        response = api_session.delete(
            f"{api_base_url}/api/Employees/{nonexistent_id}"
        )
        
        assert response.status_code in [404, 400]
