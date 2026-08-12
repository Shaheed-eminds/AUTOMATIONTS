Feature: CasePro - Case Management

  Scenario Outline: Standard user submits a case end to end and admin approves it

    # --- Log in as the standard user ---
    Given I am on the CasePro login screen
    When I sign in with username "<username>" and password "<password>"

    # --- Screen 1: Requester details ---
    # Click Next with nothing filled in first, to prove mandatory fields are enforced.
    When I try to continue without filling in the requester details screen
    Then I should see the requester details required field errors

    When I fill in the requester full name "<fullName>"
    And I fill in the employee id "<employeeId>"
    And I fill in the requester email "<email>"
    And I select the requester department "<department>"
    And I select the priority "<priority>"
    And I click next on the requester details screen

    # --- Screen 2: Case details ---
    # Same check here: Next should refuse to proceed until the required fields are filled.
    When I try to continue without filling in the case details screen
    Then I should see the case details required field errors

    When I fill in the subject "<subject>"
    And I select the category "<category>"
    And I select the case type "<caseType>"
    And I select the impact level "<impactLevel>"
    And I fill in the description "<description>"
    And I click next on the case details screen

    # --- Screen 3: Timesheet ---
    # And again: an empty timesheet row should block Next with a validation message.
    When I try to continue without filling in the timesheet screen
    Then I should see the timesheet required field error

    When I fill in timesheet entry 1 with date "<tsDate>", project "<tsProject>", task "<tsTask>", hours "<tsHours>"
    And I click next on the timesheet screen

    # --- Screen 4: Review & submit ---
    Then I should see "<fullName>" in the review requester summary
    And I should see "<subject>" in the review case summary

    When I submit the case
    Then I should see the case submitted success heading
    And I should see a case id on the success screen

    # --- Switch to admin and approve the case just submitted ---
    When I log out
    And I sign in with username "<adminUsername>" and password "<adminPassword>"
    Then I should see the admin dashboard

    When I search for the submitted case
    And I approve the case
    Then I should see the case status "Approved"

    # Data for the run above — one row is enough for the happy path;
    # add more rows here to repeat the flow with different case data.
    Examples:
      | username | password | adminUsername | adminPassword | fullName | employeeId | email             | department  | priority | subject | category  | caseType | impactLevel | description | tsDate     | tsProject     | tsTask | tsHours |
      | user1    | User@123 | admin1         | Admin@123      | Alex Kim | E2001      | alex.kim@test.com | Engineering | High     | test    | Technical | Incident | High        | test        | 2026-08-11 | Project Alpha | test   | 8       |
