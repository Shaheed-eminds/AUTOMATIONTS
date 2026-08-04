Feature: Automation Practice - Data Entry Form

  Exercises the public data-entry form at testautomationpractice.blogspot.com,
  covering text inputs, radios, checkboxes, single/multi-selects and native
  date inputs. Note: the form's "Submit" button drives a date-range
  calculator, not a network request — see AutomationFormPage for details.

  Background:
    Given I am on the automation practice form page

  Scenario Outline: Fill out and submit the data entry form
    When I enter the name "<name>"
    And I enter the email "<email>"
    And I enter the phone "<phone>"
    And I enter the address "<address>"
    And I select "<gender>" as the gender
    And I select the days "<days>"
    And I select "<country>" as the country
    And I select the colors "<colors>"
    And I select the animals "<animals>"
    And I set the start date to "<start>"
    And I set the end date to "<end>"
    And I submit the form
    Then the name field should contain "<name>"
    And the email field should contain "<email>"
    And the phone field should contain "<phone>"
    And the address field should contain "<address>"
    And the "<gender>" gender option should be selected
    And only the days "<days>" should be checked
    And the country dropdown should have "<country>" selected
    And the selected colors should be "<colors>"
    And the selected animals should be "<animals>"
    And I should see the result message "<message>"

    Examples:
      | name       | email               | phone      | address             | gender | days                    | country       | colors      | animals    | start      | end        | message                                 |
      | John Doe   | john.doe@test.com   | 9876543210 | 123 Test Street, NY | male   | monday,wednesday,friday | India         | blue,green  | lion,fox   | 2026-08-01 | 2026-08-10 | You selected a range of 9 days.         |
      | Jane Smith | jane.smith@test.com | 9123456780 | 456 Sample Ave, LA  | female | sunday,tuesday          | United States | red,yellow  | cat,dog    | 2026-08-10 | 2026-08-01 | End date must be after start date.      |
      | Alex Kim   | alex.kim@test.com   | 9988776655 | 789 Elm Street, TX  | male   | thursday,saturday       | Canada        | green,white | deer,zebra |            |            | Please select both start and end dates. |
