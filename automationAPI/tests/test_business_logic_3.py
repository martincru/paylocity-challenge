"""
Business logic and benefits calculation tests
"""
import pytest


class TestBusinessLogic:
    """Business rules and calculations tests"""
    
    def test_benefits_calculation_without_dependants(self, api_session, api_base_url):
        """TC016: Verify benefits calculation without dependants
        
        Business rules:
        - Gross: $2000 per paycheck
        - Paychecks per year: 26
        - Benefits cost: $1000/year per employee
        - BenefitsCost per paycheck: $1000 / 26 = $38.46
        - Net: $2000 - $38.46 = $1961.54
        """
        employee_data = {
            "firstName": "John",
            "lastName": "Doe",
            "username": "jdoe_test1",
            "dependants": 0,
            "salary": 52000.0
        }
        
        response = api_session.post(
            f"{api_base_url}/api/Employees",
            json=employee_data
        )
        
        assert response.status_code == 200
        employee = response.json()
        
        # Validate that calculated fields exist
        assert "gross" in employee
        assert "benefitsCost" in employee
        assert "net" in employee
        
        # Validate exact calculations
        expected_gross = 2000.0
        expected_benefits_cost = 1000.0 / 26  # $38.46153846...
        expected_net = expected_gross - expected_benefits_cost  # $1961.53846...
        
        assert employee["gross"] == pytest.approx(expected_gross, rel=0.01)
        assert employee["benefitsCost"] == pytest.approx(expected_benefits_cost, rel=0.01)
        assert employee["net"] == pytest.approx(expected_net, rel=0.01)
        
        # Cleanup
        api_session.delete(f"{api_base_url}/api/Employees/{employee['id']}")
    
    def test_benefits_calculation_with_dependants(self, api_session, api_base_url):
        """TC017: Verify benefits calculation with dependants
        
        Business rules:
        - Gross: $2000 per paycheck
        - Benefits cost: $1000/year per employee
        - Cost per dependant: $500/year each
        - With 3 dependants: ($1000 + 3*$500) / 26 = $2500 / 26 = $96.15
        - Net: $2000 - $96.15 = $1903.85
        """
        employee_data = {
            "firstName": "Jane",
            "lastName": "Smith",
            "username": "jsmith_test1",
            "dependants": 3,
            "salary": 52000.0  # Must be standard salary
        }
        
        response = api_session.post(
            f"{api_base_url}/api/Employees",
            json=employee_data
        )
        
        assert response.status_code == 200
        employee = response.json()
        
        # Validate that calculations include dependants
        assert employee["dependants"] == 3
        
        # Calculate expected values
        expected_gross = 2000.0
        employee_cost = 1000.0  # Annual cost of employee
        dependants_cost = 3 * 500.0  # 3 dependants * $500/year
        total_annual_cost = employee_cost + dependants_cost  # $2500
        expected_benefits_cost = total_annual_cost / 26  # $96.15384615...
        expected_net = expected_gross - expected_benefits_cost  # $1903.84615...
        
        assert employee["gross"] == pytest.approx(expected_gross, rel=0.01)
        assert employee["benefitsCost"] == pytest.approx(expected_benefits_cost, rel=0.01)
        assert employee["net"] == pytest.approx(expected_net, rel=0.01)
        
        # Cleanup
        api_session.delete(f"{api_base_url}/api/Employees/{employee['id']}")
    
    def test_salary_is_fixed_per_paycheck(self, api_session, api_base_url, created_employee):
        """TC018: Verify that gross is correctly calculated from annual salary
        
        Business rules:
        - Gross per paycheck = Annual Salary / 26
        - If you change the salary, gross also changes
        """
        # Update salary to a different value
        updated_data = created_employee.copy()
        new_salary = 100000.0
        updated_data["salary"] = new_salary  # Change to a high salary
        
        update_response = api_session.put(
            f"{api_base_url}/api/Employees",
            json=updated_data
        )
        
        assert update_response.status_code == 200
        
        # Get updated employee
        get_response = api_session.get(
            f"{api_base_url}/api/Employees/{created_employee['id']}"
        )
        updated_employee = get_response.json()
        
        # Gross must be salary / 26
        assert updated_employee["salary"] == new_salary
        expected_gross = new_salary / 26  # $100,000 / 26 = $3846.15...
        assert updated_employee["gross"] == pytest.approx(expected_gross, rel=0.01)
        
        # Net = gross - benefitsCost
        expected_benefits_cost = (1000.0 + (updated_employee["dependants"] * 500.0)) / 26
        expected_net = expected_gross - expected_benefits_cost
        assert updated_employee["net"] == pytest.approx(expected_net, rel=0.01)
    
    def test_dependants_updates_affect_calculations(self, api_session, api_base_url, created_employee):
        """TC019: Verify that changes in dependants correctly update calculations
        
        Business rules:
        - Each additional dependant adds $500/year to cost
        - BenefitsCost = ($1000 + dependants * $500) / 26
        """
        original_dependants = created_employee.get("dependants", 0)
        original_cost = created_employee.get("benefitsCost", 0)
        
        # Update number of dependants (add 2)
        updated_data = created_employee.copy()
        new_dependants = original_dependants + 2
        updated_data["dependants"] = new_dependants
        
        update_response = api_session.put(
            f"{api_base_url}/api/Employees",
            json=updated_data
        )
        
        assert update_response.status_code == 200
        
        # Get updated employee
        get_response = api_session.get(
            f"{api_base_url}/api/Employees/{created_employee['id']}"
        )
        updated_employee = get_response.json()
        
        # Validate that dependants were updated
        assert updated_employee["dependants"] == new_dependants
        
        # Calculate expected values with new dependants
        expected_benefits_cost = (1000.0 + (new_dependants * 500.0)) / 26
        expected_net = 2000.0 - expected_benefits_cost
        
        # Benefits cost must have increased
        assert updated_employee["benefitsCost"] > original_cost
        assert updated_employee["benefitsCost"] == pytest.approx(expected_benefits_cost, rel=0.01)
        assert updated_employee["net"] == pytest.approx(expected_net, rel=0.01)
        
        # Verify that the increment is correct (2 dependants * $500 / 26)
        expected_increase = (2 * 500.0) / 26  # $38.46 additional
        actual_increase = updated_employee["benefitsCost"] - original_cost
        assert actual_increase == pytest.approx(expected_increase, rel=0.01)
    
    def test_readonly_fields_cannot_be_modified(self, api_session, api_base_url, created_employee):
        """TC020: Verify that readonly fields cannot be modified directly"""
        # Attempt to modify readonly fields
        updated_data = created_employee.copy()
        updated_data["gross"] = 999999.99
        updated_data["benefitsCost"] = 0.01
        updated_data["net"] = 999999.98
        
        update_response = api_session.put(
            f"{api_base_url}/api/Employees",
            json=updated_data
        )
        
        # Update may be successful, but readonly values should not change
        get_response = api_session.get(
            f"{api_base_url}/api/Employees/{created_employee['id']}"
        )
        employee = get_response.json()
        
        # Readonly fields must be calculated, not the values we tried to set
        assert employee["gross"] != 999999.99
        assert employee["benefitsCost"] != 0.01
        assert employee["net"] != 999999.98
    
    def test_annual_salary_calculation(self, api_session, api_base_url):
        """TC021: Verify that annual salary is consistent with 26 paychecks
        
        Business rules:
        - Gross per paycheck: $2000
        - Paychecks per year: 26
        - Expected annual salary: $2000 * 26 = $52,000
        """
        employee_data = {
            "firstName": "Annual",
            "lastName": "Test",
            "username": "atest",
            "dependants": 0,
            "salary": 52000.0
        }
        
        response = api_session.post(
            f"{api_base_url}/api/Employees",
            json=employee_data
        )
        
        assert response.status_code == 200
        employee = response.json()
        
        # Verify that salary and gross are consistent
        expected_annual_salary = employee["gross"] * 26
        assert employee["salary"] == pytest.approx(expected_annual_salary, rel=0.01)
        
        # Cleanup
        api_session.delete(f"{api_base_url}/api/Employees/{employee['id']}")
    
    def test_benefits_calculation_with_max_dependants(self, api_session, api_base_url):
        """TC022: Verify calculation with maximum dependants (32)
        
        Business rules:
        - Gross: $2000
        - Employee cost: $1000/year
        - Cost for 32 dependants: 32 * $500 = $16,000/year
        - Annual total: $17,000
        - BenefitsCost per paycheck: $17,000 / 26 = $653.85
        - Net: $2000 - $653.85 = $1346.15
        """
        employee_data = {
            "firstName": "Max",
            "lastName": "Dependants",
            "username": "maxdep",
            "dependants": 32,
            "salary": 52000.0
        }
        
        response = api_session.post(
            f"{api_base_url}/api/Employees",
            json=employee_data
        )
        
        assert response.status_code == 200
        employee = response.json()
        
        # Calculate expected values
        expected_gross = 2000.0
        expected_benefits_cost = (1000.0 + (32 * 500.0)) / 26  # $653.846...
        expected_net = expected_gross - expected_benefits_cost  # $1346.154...
        
        assert employee["gross"] == pytest.approx(expected_gross, rel=0.01)
        assert employee["benefitsCost"] == pytest.approx(expected_benefits_cost, rel=0.01)
        assert employee["net"] == pytest.approx(expected_net, rel=0.01)
        
        # Verify that net is positive even with 32 dependants
        assert employee["net"] > 0
        
        # Cleanup
        api_session.delete(f"{api_base_url}/api/Employees/{employee['id']}")
    
    def test_benefits_cost_increases_linearly_with_dependants(self, api_session, api_base_url):
        """TC023: Verify that cost increases linearly ($500/year per dependant)
        
        Business rules:
        - Each additional dependant adds exactly $500/year
        - Per paycheck: $500 / 26 = $19.23 additional
        """
        # Create employee without dependants
        employee_0_deps = {
            "firstName": "Zero",
            "lastName": "Deps",
            "username": "zero_deps",
            "dependants": 0,
            "salary": 52000.0
        }
        
        response_0 = api_session.post(
            f"{api_base_url}/api/Employees",
            json=employee_0_deps
        )
        emp_0 = response_0.json()
        
        # Create employee with 1 dependant
        employee_1_dep = {
            "firstName": "One",
            "lastName": "Dep",
            "username": "one_dep",
            "dependants": 1,
            "salary": 52000.0
        }
        
        response_1 = api_session.post(
            f"{api_base_url}/api/Employees",
            json=employee_1_dep
        )
        emp_1 = response_1.json()
        
        # The difference must be exactly $500/26 per dependant
        expected_diff_per_dependant = 500.0 / 26  # $19.23076...
        actual_diff = emp_1["benefitsCost"] - emp_0["benefitsCost"]
        
        assert actual_diff == pytest.approx(expected_diff_per_dependant, rel=0.01)
        
        # Cleanup
        api_session.delete(f"{api_base_url}/api/Employees/{emp_0['id']}")
        api_session.delete(f"{api_base_url}/api/Employees/{emp_1['id']}")
