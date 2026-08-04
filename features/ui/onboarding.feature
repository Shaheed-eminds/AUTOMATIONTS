Feature: Onboardly - Employee Onboarding Wizard

  Fills out all 4 screens of the onboarding wizard (Personal, Job Details,
  Benefits, Review) served from the local onboardly-app.html file and
  submits it.

  Background:
    Given I am on the onboarding personal details screen

  Scenario Outline: Completing the wizard produces a review summary and a submission id
    When I try to continue without filling in the personal details screen
    Then I should see the personal details required field errors

    When I fill in the full name "<fullName>"
    And I fill in the email "<email>"
    And I select the country "<country>"
    And I select the state "<state>"
    And I select the city "<city>"
    And I select the employment type "<employmentType>"
    And I click next on the personal details screen

    When I try to continue without filling in the job details screen
    Then I should see the job details required field errors

    When I select the department "<department>"
    And I select the role "<role>"
    And I fill in the reporting manager "<reportingManager>"
    And I choose to work remotely "<remote>"
    And I select the timezone "<timezone>"
    And I click next on the job details screen

    When I select the health plan "<healthPlan>"
    And I set the number of dependents to <dependentsCount>
    And I fill in dependent 1 name "<dependent1>"
    And I fill in dependent 2 name "<dependent2>"
    And I fill in the retirement contribution "<retirementPct>"
    And I check the equity grant checkbox
    And I click next on the benefits screen

    When I submit the onboarding form
    Then I should see the success heading "<successHeading>"
    And I should see the success message "<successMessage>"
    And I should see a submission id starting with "<submissionIdPrefix>"

    When I restart the onboarding wizard
    Then I should be back on the onboarding personal details screen

    Examples:
      | fullName | email              | country | state     | city      | employmentType | department  | role                      | reportingManager | remote | timezone       | healthPlan | dependentsCount | dependent1 | dependent2 | retirementPct | successHeading   | successMessage                          | submissionIdPrefix |
      | Alex Kim | alex.kim@test.com | India   | Karnataka | Bengaluru | full-time      | Engineering | Site Reliability Engineer | Morgan Lee        | yes    | IST (UTC+5:30) | Basic      | 2               | Riya Kim   | Dev Kim    | 5             | You're all set! | The onboarding record has been created. | OB                  |
