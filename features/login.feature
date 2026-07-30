Feature: Login

  Background:
    Given I am on the login page

  Scenario: Successful login with valid credentials
    When I log in with valid credentials
    Then I should see the dashboard

  Scenario Outline: Unsuccessful login with invalid credentials
    When I log in with username "<username>" and password "<password>"
    Then I should see the error message "Invalid credentials"

    Examples:
      | username     | password       |
      | invalid_user | wrong_password |
      | Admin        | wrongpassword  |
      | random_user  | random_pass    |

  Scenario Outline: Validation error when required fields are missing
    When I log in with username "<username>" and password "<password>"
    Then I should see a required field validation error

    Examples:
      | username | password |
      |          |          |
      | Admin    |          |
      |          | admin123 |
