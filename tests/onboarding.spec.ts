import { test } from '../src/fixtures/pageFixtures';

test.describe('Onboardly - Employee Onboarding Wizard', () => {
  test.beforeEach(async ({ personalDetailsPage }) => {
    await personalDetailsPage.open();
  });

  test('completes the wizard end to end and produces a submission id', async ({
    personalDetailsPage,
    jobDetailsPage,
    benefitsPage,
    reviewPage,
  }) => {
    // Values entered on the personal details screen.
    const fullName = 'Alex Kim';
    const email = 'alex.kim@test.com';
    const country = 'India';
    const state = 'Karnataka';
    const city = 'Bengaluru';
    const employmentType = 'full-time';

    // Values entered on the job details screen.
    const department = 'Engineering';
    const role = 'Site Reliability Engineer';
    const reportingManager = 'Morgan Lee';
    const remote = 'yes';
    const timezone = 'IST (UTC+5:30)';

    // Values entered on the benefits screen.
    const healthPlan = 'Basic';
    const dependent1 = 'Riya Kim';
    const dependent2 = 'Dev Kim';
    const retirementPct = '5';

    // Expected values on the success screen after submitting.
    const successHeadingText = "You're all set!";
    const successMessageText = 'The onboarding record has been created.';
    const submissionIdPrefix = 'OB';

    // Click Next with nothing filled in first, to check the required-field errors.
    await personalDetailsPage.goNext();
    await personalDetailsPage.expectAllRequiredFieldErrors();
    await personalDetailsPage.expectScreenVisible(1);

    await personalDetailsPage.fillFullName(fullName);
    await personalDetailsPage.fillEmail(email);
    await personalDetailsPage.selectCountry(country);
    await personalDetailsPage.selectState(state);
    await personalDetailsPage.selectCity(city);
    await personalDetailsPage.selectEmploymentType(employmentType);
    await personalDetailsPage.goNext();

    // Same thing on the job details screen: click Next empty first, check the errors.
    await jobDetailsPage.goNext();
    await jobDetailsPage.expectAllRequiredFieldErrors();
    await jobDetailsPage.expectScreenVisible(2);

    await jobDetailsPage.selectDepartment(department);
    await jobDetailsPage.selectRole(role);
    await jobDetailsPage.fillReportingManager(reportingManager);
    await jobDetailsPage.selectRemote(remote);
    await jobDetailsPage.selectTimezone(timezone);
    await jobDetailsPage.goNext();

    await benefitsPage.selectHealthPlan(healthPlan);
    await benefitsPage.setDependentsCount(2);
    await benefitsPage.fillDependentName(0, dependent1);
    await benefitsPage.fillDependentName(1, dependent2);
    await benefitsPage.fillRetirementPct(retirementPct);
    await benefitsPage.checkEquityGrant();
    await benefitsPage.goNext();

    await reviewPage.submit();
    await reviewPage.expectScreenVisible('success');

    await reviewPage.expectSuccessHeading(successHeadingText);
    await reviewPage.expectSuccessMessage(successMessageText);
    await reviewPage.expectSubmissionIdVisible(submissionIdPrefix);

    const submissionId = await reviewPage.getSubmissionId();
    console.log(`stored submission id: ${submissionId}`);

    await reviewPage.restart();
    await personalDetailsPage.expectScreenVisible(1);
  });
});
