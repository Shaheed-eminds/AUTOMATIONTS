
import { test } from '../src/fixtures/pageFixtures';

test.describe('Employee registration ', () => {
  test.beforeEach(async ({ loginDetailsPage }) => {
    await loginDetailsPage.open();
  });

  test('completes the wizard to login employee details', async ({
    loginDetailsPage,
    requesterDetailsPage,
    caseDetailsPage,
    timesheetDetailsPage,
    reviewtimesheetPage,
    casesubmittedPage,
    
  }) => {
    // Values entered on the login details screen.
    const username = 'user1';
    const password = 'User@123';
    

    // Values entered on the requester details screen.
    const name= 'radhika';
    const EmpId = '1203';
    const email = 'radhika@example.com';
    const department = 'Engineering';
    const PriorityType = 'High';

    // Values entered on the case details screen.
    const subject = 'testing';
    const category = 'Technical';
    const casetype = 'Service Request';
    const description = 'employee case';

    const timesheetDate = '8/12/2026';
    const project = 'Project Alpha';
    const taskdesc = 'Task1';
    const workhours = '21';

    // Expected values on the success screen after submitting.
    const successHeadingText = "You're all set!";
    const successMessageText = 'The onboarding record has been created.';
    const submissionIdPrefix = 'OB';

    // Click Next with nothing filled in first, to check the required-field errors.
    //await loginDetailsPage.goNext();
    //await personalDetailsPage.expectAllRequiredFieldErrors();
    await loginDetailsPage.expectScreenVisible(1);

    await loginDetailsPage.fillUsername(username);
    await loginDetailsPage.fillPassword(password);
    await loginDetailsPage.goSignIn();

    // Same thing on the job details screen: click Next empty first, check the errors.
    await requesterDetailsPage.goNext();
    await requesterDetailsPage.expectScreenVisible(2);

    await requesterDetailsPage.fillFullName(name);
    await requesterDetailsPage.fillEmployeeID(EmpId);
    await requesterDetailsPage.fillEmailAddress(email);
    await requesterDetailsPage.selectDepartment(department);
    await requesterDetailsPage.selectPriority(PriorityType);
    await requesterDetailsPage.goNext();

    await caseDetailsPage.fillSubject(subject);
    await caseDetailsPage.fillCategory(category);
    await caseDetailsPage.selectCaseType(casetype);
    await caseDetailsPage.enterDescription(description);
    await caseDetailsPage.expectScreenVisible(2);

    await timesheetDetailsPage.EnterTimesheetDate(timesheetDate);
    await timesheetDetailsPage.ChoiceProject(project);
    await timesheetDetailsPage.EnterTaskDesc(taskdesc);
    await timesheetDetailsPage.EnterWorkHours(workhours);
    await timesheetDetailsPage.expectScreenVisible(3);
    
await reviewtimesheetPage.expectScreenVisible(4);
await reviewtimesheetPage.submitCase();
await casesubmittedPage.expectScreenVisible(5);

   // const submissionId = await reviewPage.getSubmissionId();
   // console.log(`stored submission id: ${submissionId}`);

   // await reviewPage.restart();
    //await log.expectScreenVisible(1);
  });
});
