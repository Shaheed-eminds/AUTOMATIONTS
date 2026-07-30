Feature: Login
  As a user of OrangeHRM
  I want to log in with my credentials
  So that I can access the dashboard

  Background:
    Given I am on the login page

  Scenario: Successful login with valid credentials
    When I log in with valid credentials
    Then I should see the dashboard

  Scenario: Unsuccessful login with invalid credentials
    When I log in with invalid credentials
    Then I should see the error message "Invalid credentials"

  Scenario: Validation error when credentials are left empty
    When I log in with empty credentials
    Then I should see a required field validation error
