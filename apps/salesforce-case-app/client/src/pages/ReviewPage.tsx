import { useState } from 'react';
import type { CaseDetails, Requester, TimesheetEntry } from '../types';

export default function ReviewPage({
  requester,
  caseDetails,
  timesheet,
  onBack,
  onJump,
  onSubmit,
}: {
  requester: Requester;
  caseDetails: CaseDetails;
  timesheet: TimesheetEntry[];
  onBack: () => void;
  onJump: (step: 1 | 2 | 3) => void;
  onSubmit: () => Promise<void>;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const totalHours = timesheet.reduce((sum, r) => sum + (Number(r.hours) || 0), 0);

  async function handleSubmit() {
    setSubmitting(true);
    setError('');
    try {
      await onSubmit();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section data-testid="screen-4">
      <h2>Review &amp; Submit</h2>

      {error && <div className="form-error-banner" data-testid="submit-error">{error}</div>}

      <div className="summary-block">
        <h3>Requester <button className="edit-link" data-testid="edit-screen-1" onClick={() => onJump(1)}>Edit</button></h3>
        <div className="summary-row"><span>Name</span><span data-testid="summary-fullName">{requester.fullName}</span></div>
        <div className="summary-row"><span>Employee ID</span><span data-testid="summary-employeeId">{requester.employeeId}</span></div>
        <div className="summary-row"><span>Email</span><span data-testid="summary-email">{requester.email}</span></div>
        <div className="summary-row"><span>Department</span><span data-testid="summary-department">{requester.department}</span></div>
        <div className="summary-row"><span>Priority</span><span data-testid="summary-priority">{requester.priority}</span></div>
      </div>

      <div className="summary-block">
        <h3>Case Details <button className="edit-link" data-testid="edit-screen-2" onClick={() => onJump(2)}>Edit</button></h3>
        <div className="summary-row"><span>Subject</span><span data-testid="summary-subject">{caseDetails.subject}</span></div>
        <div className="summary-row"><span>Category</span><span data-testid="summary-category">{caseDetails.category}</span></div>
        <div className="summary-row"><span>Case type</span><span data-testid="summary-caseType">{caseDetails.caseType}</span></div>
        {caseDetails.caseType === 'Incident' && (
          <div className="summary-row"><span>Impact level</span><span data-testid="summary-impactLevel">{caseDetails.impactLevel}</span></div>
        )}
        {caseDetails.caseType === 'Change Request' && (
          <div className="summary-row"><span>Requested date</span><span data-testid="summary-requestedDate">{caseDetails.requestedDate}</span></div>
        )}
        <div className="summary-row"><span>Description</span><span data-testid="summary-description">{caseDetails.description}</span></div>
      </div>

      <div className="summary-block">
        <h3>Timesheet <button className="edit-link" data-testid="edit-screen-3" onClick={() => onJump(3)}>Edit</button></h3>
        {timesheet.map((row, idx) => (
          <div className="summary-row" key={idx} data-testid={`summary-ts-row-${idx}`}>
            <span>{row.date} · {row.project}</span>
            <span>{row.taskDescription} — {row.hours}h</span>
          </div>
        ))}
        <div className="summary-row"><span>Total hours</span><span data-testid="summary-totalHours">{totalHours}</span></div>
      </div>

      <div className="actions">
        <button className="secondary" data-testid="btn-back-4" onClick={onBack}>Back</button>
        <button className="primary" data-testid="btn-submit" onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit Case'}
        </button>
      </div>
    </section>
  );
}
