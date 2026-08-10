import { useEffect, useState } from 'react';
import { decideCase, fetchCase } from '../api';
import type { AuthUser, CaseRecord } from '../types';

export default function AdminCaseDetailPage({
  caseId,
  admin,
  onBack,
}: {
  caseId: string;
  admin: AuthUser;
  onBack: () => void;
}) {
  const [current, setCurrent] = useState<CaseRecord | null>(null);
  const [loadError, setLoadError] = useState('');
  const [rejecting, setRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [decisionError, setDecisionError] = useState('');
  const [busy, setBusy] = useState(false);

  async function load() {
    setLoadError('');
    try {
      setCurrent(await fetchCase(caseId));
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Could not load this case.');
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseId]);

  async function handleApprove() {
    if (!current) return;
    setBusy(true);
    setDecisionError('');
    try {
      setCurrent(await decideCase(current.caseId, 'approve', null, admin.fullName));
    } catch (err) {
      setDecisionError(err instanceof Error ? err.message : 'Approve failed.');
    } finally {
      setBusy(false);
    }
  }

  async function handleReject() {
    if (!current) return;
    if (!rejectReason.trim()) {
      setDecisionError('A reason is required to reject a case.');
      return;
    }
    setBusy(true);
    setDecisionError('');
    try {
      setCurrent(await decideCase(current.caseId, 'reject', rejectReason.trim(), admin.fullName));
      setRejecting(false);
      setRejectReason('');
    } catch (err) {
      setDecisionError(err instanceof Error ? err.message : 'Reject failed.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div data-testid="admin-case-detail">
      <button className="secondary back-link" data-testid="btn-back-to-dashboard" onClick={onBack}>
        ← Back to Dashboard
      </button>

      {loadError && <div className="form-error-banner" data-testid="detail-load-error">{loadError}</div>}

      {current && (
        <>
          <div className="highlights-panel" data-testid="case-highlights">
            <div className="highlights-top">
              <div className="object-icon">C</div>
              <div>
                <div className="object-eyebrow">Case</div>
                <h1 className="highlights-title" data-testid="case-detail-id">{current.caseId}</h1>
              </div>
              <span
                className={`status-badge ${current.status}`}
                data-testid="case-detail-status"
                style={{ marginLeft: 'auto' }}
              >
                {current.status}
              </span>
            </div>
            <div className="highlights-fields">
              <div className="highlight-field"><span className="hf-label">Subject</span><span className="hf-value">{current.caseDetails.subject}</span></div>
              <div className="highlight-field"><span className="hf-label">Priority</span><span className="hf-value">{current.requester.priority}</span></div>
              <div className="highlight-field"><span className="hf-label">Requester</span><span className="hf-value">{current.requester.fullName}</span></div>
              <div className="highlight-field"><span className="hf-label">Department</span><span className="hf-value">{current.requester.department}</span></div>
            </div>
          </div>

          <div className="card" data-testid="case-detail-card">
          <div className="summary-block">
            <h3>Requester</h3>
            <div className="summary-row"><span>Name</span><span data-testid="detail-fullName">{current.requester.fullName}</span></div>
            <div className="summary-row"><span>Employee ID</span><span data-testid="detail-employeeId">{current.requester.employeeId}</span></div>
            <div className="summary-row"><span>Email</span><span data-testid="detail-email">{current.requester.email}</span></div>
            <div className="summary-row"><span>Department</span><span data-testid="detail-department">{current.requester.department}</span></div>
            <div className="summary-row"><span>Priority</span><span data-testid="detail-priority">{current.requester.priority}</span></div>
          </div>

          <div className="summary-block">
            <h3>Case Details</h3>
            <div className="summary-row"><span>Subject</span><span data-testid="detail-subject">{current.caseDetails.subject}</span></div>
            <div className="summary-row"><span>Category</span><span data-testid="detail-category">{current.caseDetails.category}</span></div>
            <div className="summary-row"><span>Case type</span><span data-testid="detail-caseType">{current.caseDetails.caseType}</span></div>
            {current.caseDetails.caseType === 'Incident' && (
              <div className="summary-row"><span>Impact level</span><span data-testid="detail-impactLevel">{current.caseDetails.impactLevel}</span></div>
            )}
            {current.caseDetails.caseType === 'Change Request' && (
              <div className="summary-row"><span>Requested date</span><span data-testid="detail-requestedDate">{current.caseDetails.requestedDate}</span></div>
            )}
            <div className="summary-row"><span>Description</span><span data-testid="detail-description">{current.caseDetails.description}</span></div>
          </div>

          <div className="summary-block">
            <h3>Timesheet</h3>
            <table className="timesheet-table" data-testid="detail-timesheet-table">
              <thead>
                <tr><th>Date</th><th>Project</th><th>Task</th><th>Hours</th></tr>
              </thead>
              <tbody>
                {current.timesheet.map((row, idx) => (
                  <tr key={idx} data-testid={`detail-ts-row-${idx}`}>
                    <td>{row.date}</td>
                    <td>{row.project}</td>
                    <td>{row.taskDescription}</td>
                    <td>{row.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="timesheet-total" data-testid="detail-totalHours">Total hours: {current.totalHours}</div>
          </div>

          {current.status === 'Submitted' && (
            <div className="decision-box" data-testid="decision-box">
              {decisionError && <div className="form-error-banner" data-testid="decision-error">{decisionError}</div>}
              {!rejecting ? (
                <div className="decision-actions">
                  <button className="primary" data-testid="btn-approve" onClick={handleApprove} disabled={busy}>Approve</button>
                  <button className="danger" data-testid="btn-reject" onClick={() => setRejecting(true)} disabled={busy}>Reject</button>
                </div>
              ) : (
                <div className="reject-reason">
                  <label htmlFor="rejectReason">Reason for rejection</label>
                  <textarea
                    id="rejectReason"
                    data-testid="input-rejectReason"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  />
                  <div className="decision-actions">
                    <button className="secondary" data-testid="btn-cancel-reject" onClick={() => { setRejecting(false); setRejectReason(''); }} disabled={busy}>
                      Cancel
                    </button>
                    <button className="danger" data-testid="btn-confirm-reject" onClick={handleReject} disabled={busy}>
                      Confirm Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {current.decision && (
            <div className="decision-box" data-testid="decision-summary">
              <div className="summary-row">
                <span>Decision</span>
                <span data-testid="decision-action">{current.decision.action} by {current.decision.decidedBy}</span>
              </div>
              {current.decision.reason && (
                <div className="summary-row"><span>Reason</span><span data-testid="decision-reason">{current.decision.reason}</span></div>
              )}
            </div>
          )}
          </div>
        </>
      )}
    </div>
  );
}
