Feature: EmployeeTimehseet - Employee working details 
  Background:
    Given I am on the Login Application screen

  Scenario Outline: Login to the Application with User details

   When I try to signin without filling in the valid login credentials on screen
   Then I should see the login details required field error

    When I fill in the Username "<Username>"
    And I fill in the Password "<Password>"
    And I click signin on the Login details screen

    Then I should see the requester details screen


   When I select the fullname "<fullname>"
   And I select the employeeID "<empID>"
   And I select the emailAddress "<email>"
   And I select the department "<department>"
   And I select the priority type "<priorityType>"
   Then I click Next on the Requester details screen

       Examples:
      | Username | Password|  fullname|  empID|  email|  department|priorityType|
      |  user1 |   User@123|  radhika|   1203|  radhika@example.com|  Engineering|High|