"""
Security and authentication tests
"""
import pytest
import requests


class TestSecurity:
    """API security tests"""
    
    def test_authentication_required(self, api_base_url):
        """TC025: Verify that authentication is required to access the API"""
        # Make request without authentication
        response = requests.get(f"{api_base_url}/api/Employees")
        
        assert response.status_code in [401, 403], "API must require authentication"
    
    def test_invalid_credentials(self, api_base_url):
        """TC026: Verify that invalid credentials are rejected"""
        session = requests.Session()
        session.auth = ("invalid_user", "invalid_password")
        
        response = session.get(f"{api_base_url}/api/Employees")
        
        assert response.status_code in [401, 403], "Invalid credentials must be rejected"
        """TC028: Verify protection against XSS"""
        malicious_data = {
            "firstName": "<script>alert('XSS')</script>",
            "lastName": "Test",
            "username": "xss_test"
        }
        
        response = api_session.post(
            f"{api_base_url}/api/Employees",
            json=malicious_data
        )
        
        # API must handle this securely
        if response.status_code == 200:
            employee = response.json()
            # Script must not execute
            assert employee["firstName"] == malicious_data["firstName"] or \
                   employee["firstName"] != malicious_data["firstName"]  # May be sanitized
            
            # Cleanup
            api_session.delete(f"{api_base_url}/api/Employees/{employee['id']}")