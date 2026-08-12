import { createBdd } from 'playwright-bdd';
import { expect, test } from '../../src/fixtures/pageFixtures';
import { BenefitsPage } from '@pages/BenefitsPage';
//import { LoginDetailsPage} from '@pages/LoginDetailsPage';
//import { RequesterDetailsPage } from '@pages/RequesterDetailsPage';
//import { CaseDetailsPage } from '@pages/CaseDetailsPage';
//import { TimesheetDetailsPage } from '@pages/TimesheetDetailsPage';



const { Given, When, Then } = createBdd(test);
// ---------- Screen 1: Login details for RenderApp----------

Given('I am on the Login Application screen', async ({ loginDetailsPage }) => {
    await loginDetailsPage.open();
  //await loginDetailsPage.expectScreenVisible(1);
});

When('I try to signin without filling in the valid login credentials on screen', async ({ loginDetailsPage }) => {
  await loginDetailsPage.goSignIn();
});


Then('I should see the login details required field error', async ({ loginDetailsPage }) => {
  await loginDetailsPage.expectUserNameError();
  //await loginDetailsPage.expectScreenVisible(1);
});

When('I fill in the Username {string}', async ({ loginDetailsPage }, name: string) => {
  //await loginDetailsPage.waitUntilUsernameDisplayed();
  await loginDetailsPage.fillUsername(name);
});

When('I fill in the Password {string}', async ({ loginDetailsPage }, password: string) => {
  await loginDetailsPage.fillPassword(password);
});

When ('I click the Sign in button', async ({ loginDetailsPage }) => {
  await loginDetailsPage.goSignIn();
  //await this.page.waitForTimeout(10000);
  //await requesterDetailsPage.expectScreenVisible(2);
  //await loginDetailsPage.waitForUrlContains('requester-details');
  //(await requesterDetailsPage.title()).match(/Requester Details/);
 // await requesterDetailsPage.waitForUrlContains('requester-details');
});

When('I click signin on the Login details screen', async ({ loginDetailsPage, requesterDetailsPage }) => {
  await loginDetailsPage.goSignIn();
});

Then('I should see the requester details screen', async ({ requesterDetailsPage }) => {
   //await requesterDetailsPage.waitForTimeout(5000);
  //await requesterDetailsPage.waitForUrlContains('requester');
  await requesterDetailsPage.expectScreenVisible(2);
  });


When('I select the fullname {string}', async ({ requesterDetailsPage }, fullName: string) => {
    await requesterDetailsPage.fillFullName(fullName);
  });

When('I select the employeeID {string}', async ({ requesterDetailsPage }, empID: string) => {
  await requesterDetailsPage.fillEmployeeID(empID);
});

When('I select the emailAddress {string}', async ({ requesterDetailsPage }, email: string) => {
  await requesterDetailsPage.fillEmailAddress(email);
});

When('I select the departmentaldetails {string}', async ({ requesterDetailsPage }, department: string) => {
    // Click the dropdown
    //await requesterDetailsPage.click('select[name="department"]');
    // Select the option
    //await this.page.selectOption('select[name="department"]', { label: department })
  
  await requesterDetailsPage.selectDepartment(department);
  //await requesterDetailsPage.selectOption('select[name="department"]', department);
});

//When('I select the departmental {string}', async ({ requesterDetailsPage }, department: string) => {
  //await requesterDetailsPage.selectDepartment(department);
//});

When('I select the priority type {string}', async ({ requesterDetailsPage }, priorityType: string) => {
  if (priorityType === 'Low') {
    await requesterDetailsPage.selectPriority('Low' as any);
  } else if (priorityType === 'Medium') {
    await requesterDetailsPage.selectPriority('Medium' as any);
  } else if (priorityType === 'High') {
    await requesterDetailsPage.selectPriority('High' as any);
  } else if (priorityType === 'Critical') {
    await requesterDetailsPage.selectPriority('Critical' as any);
  }
});
   
Then('I click Next button on the Requester details screen', async ({ requesterDetailsPage, caseDetailsPage }) => {
  await requesterDetailsPage.goNext();
  await caseDetailsPage.expectScreenVisible(3);
});


When('I select the subject {string}', async ({ caseDetailsPage }, subject: string) => {

  await caseDetailsPage.fillSubject(subject);
});

  When('I select the category {string}', async ({ caseDetailsPage }, category: string) => {
   await caseDetailsPage.fillCategory(category);
  });

When('I select the casetype {string}', async ({ caseDetailsPage }, caseType: string) => {
  if (caseType === 'Incident') {
    await caseDetailsPage.selectCaseType('Incident' as any);
  } else if (caseType === 'Service Request') {
    await caseDetailsPage.selectCaseType('Service Request' as any);
  } else if (caseType === 'Change Request') {
    await caseDetailsPage.selectCaseType('Change Request' as any);
  } 
});

 When('I select the description {string}', async ({ caseDetailsPage }, description: string) => {
   await caseDetailsPage.enterDescription(description);
  });

  Then('I click Next on the Case details screen', async ({ caseDetailsPage,timesheetDetailsPage }) => {
  await caseDetailsPage.goNext();
  await timesheetDetailsPage.expectScreenVisible(4);
});





When('I select the timesheetDate {string}', async ({ timesheetDetailsPage }, timesheetDate: string) => {
    await timesheetDetailsPage.EnterTimesheetDate(timesheetDate);
  });

When('I select the project {string}', async ({ timesheetDetailsPage }, project: string) => {
  await timesheetDetailsPage.ChoiceProject(project);
});

When('I select the taskdesc {string}', async ({ timesheetDetailsPage }, taskdesc: string) => {
  await timesheetDetailsPage.EnterTaskDesc(taskdesc);
});

When('I select the workhours {string}', async ({ timesheetDetailsPage }, workhours: string) => {
  await timesheetDetailsPage.EnterWorkHours(workhours);
  await timesheetDetailsPage.goNext();
});


Then('I click Next on Timesheet details screen', async ({ timesheetDetailsPage,reviewtimesheetPage }) => {
  await timesheetDetailsPage.goNext();
  await reviewtimesheetPage.expectScreenVisible(5);
});


When('I review all task details about employee {string}', async ({ reviewtimesheetPage,casesubmittedPage }, employee: string) => {
    await reviewtimesheetPage.expectScreenVisible(5);
    await reviewtimesheetPage.submitCase();
    await casesubmittedPage.expectScreenVisible(6);
  });

   Then ('I click Submitcase on the Review Timesheet details screen', async ({ casesubmittedPage,loginDetailsPage }) => {
  await casesubmittedPage.expectScreenVisible(7);
  });
