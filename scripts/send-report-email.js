// Sends the Playwright HTML report (zipped) by email after a successful CI run.
// Only ever invoked from the pipeline on success — see azure-pipelines.yml.
//
// Required environment variables (set as Azure Pipelines secret variables):
//   MAIL_USERNAME   - the sending mailbox's address
//   MAIL_PASSWORD   - the sending mailbox's password (mark this one Secret in ADO)
//   MAIL_RECIPIENTS - comma-separated list of recipient addresses

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

async function main() {
  const { MAIL_USERNAME, MAIL_PASSWORD, MAIL_RECIPIENTS } = process.env;

  if (!MAIL_USERNAME || !MAIL_PASSWORD || !MAIL_RECIPIENTS) {
    console.log('MAIL_USERNAME, MAIL_PASSWORD, or MAIL_RECIPIENTS not set — skipping email.');
    return;
  }

  const reportZipPath = path.resolve(__dirname, '..', 'html-report.zip');
  const attachments = [];
  if (fs.existsSync(reportZipPath)) {
    attachments.push({ filename: 'html-report.zip', path: reportZipPath });
  } else {
    console.log('html-report.zip not found — sending the email without a report attached.');
  }

  const repository = process.env.BUILD_REPOSITORY_NAME || 'AUTOMATIONTS';
  const branch = process.env.BUILD_SOURCEBRANCHNAME || 'main';
  const buildId = process.env.BUILD_BUILDID || '';
  const buildNumber = process.env.BUILD_BUILDNUMBER || buildId;
  const collectionUri = process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI || '';
  const project = process.env.SYSTEM_TEAMPROJECT || '';
  const runUrl = collectionUri && project && buildId
    ? `${collectionUri}${project}/_build/results?buildId=${buildId}`
    : '';

  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: MAIL_USERNAME,
      pass: MAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: MAIL_USERNAME,
    to: MAIL_RECIPIENTS.split(',').map((address) => address.trim()),
    subject: `Playwright Tests PASSED - ${repository} (${branch}) #${buildNumber}`,
    text: [
      'Playwright test run finished with status: succeeded',
      '',
      `Repository: ${repository}`,
      `Branch: ${branch}`,
      `Build: ${buildNumber}`,
      runUrl ? `Run URL: ${runUrl}` : '',
      '',
      'The full HTML report is attached (zipped).',
    ].filter(Boolean).join('\n'),
    attachments,
  });

  console.log(`Report email sent to: ${MAIL_RECIPIENTS}`);
}

main().catch((error) => {
  console.error('Failed to send report email:', error);
  process.exit(1);
});
