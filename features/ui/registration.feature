Feature: EmployeeTimehseet - Employee wroking details 
  Background:
    Given I am on the Login Application screen

  Scenario Outline: Login to the Application with User details

    When I try to signin without filling in the valid login credentials on screen
    Then I should see the login details required field error

    When I fill in the Username "<Username>"
    And I fill in the Password "<Password>"
    And I click signin on the Login details screen

    Then I should see the requester details screen

// requester details page input data
   When I select the department "<department>"
    And I select the role "<role>"
    And I fill in the reporting manager "<reportingManager>"

       Examples:
      | Username | Password|          
      |  user1 |   User@123|