Feature: EmployeeTimehseet - Employee working details 
  Background:
    Given I am on the Login Application screen

  Scenario Outline: Login to the Application with User details

 // When I try to signin without filling in the valid login credentials on screen
 // Then I should see the login details required field error

    When I fill in the Username "<Username>"
    And I fill in the Password "<Password>"
    And I click the Sign in button
    Then I should see the requester details screen

    When I select the fullname "<fullname>"
    And I select the employeeID "<empID>"
    And I select the emailAddress "<email>"
   And I select the departmentaldetails "<department>"
    And I select the priority type "<priorityType>"
    Then I click Next button on the Requester details screen

    When I select the subject "<subject>"
    And I select the category "<category>"
    And I select the casetype "<casetype>"
    And I select the description "<description>"
    Then I click Next on the Case details screen


    When I select the timesheetDate "<timesheetDate>"
    And I select the project "<project>"
    And I select the taskdesc "<taskdesc>"
    And I select the workhours "<workhours>"
   Then I click Next on Timesheet details screen

    When I review all task details about employee "<employee>"
    Then I click Submitcase on the Review Timesheet details screen

    Examples:
      | Username | Password|  fullname|  empID|  email|               department    |priorityType|subject|category| casetype| description|TimesheetDate|project|taskdesc|workhours|
      |  user1 |   User@123|  radhika|   1203|  radhika@example.com|  Engineering   |High        |testing|Technical|Service Request|employee case|8/12/2026|Project Alpha|Task1|21|