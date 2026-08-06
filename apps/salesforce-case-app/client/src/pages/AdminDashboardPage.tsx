import { useEffect, useState } from 'react';
import { decideCase, fetchCase, listCases } from '../api';
import type { AuthUser, CaseRecord } from '../types';

export default function AdminDashboardPage({ admin }: { admin: AuthUser }) {
  const [searchId, setSearchId] = useState('');
  const [searchError, setSearchError] = useState('');
  const [current, setCurrent] = useState<CaseRecord | null>(null);
  const [recent, setRecent] = useState<CaseRecord[]>([]);
  const [rejecting, setRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [decisionError, setDecisionError] = useState('');
  const [busy, setBusy] = useState(false);

  async function refreshRecent() {
    try {
      setRecent(await listCases());
    } catch {
      // Non-critical — recent list is a convenience panel.
    }
  }

  useEffect(() => {
    refreshRecent();
  }, []);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchError('');
    setDecisionError('');
    setRejecting(false);
    setRejectReason('');
    if (!searchId.trim()) {
      setSearchError('Enter a Case ID to search.');
      return;
    }
    try {
      const record = await fetchCase(searchId.trim());
      setCurrent(record);
    } catch (err) {
      setCurrent(null);
      setSearchError(err instanceof Error ? err.message : 'Search failed.');
    }
  }

  function openCase(record: CaseRecord) {
    setCurrent(record);
    setSearchId(record.caseId);
    setSearchError('');
    setDecisionError('');
    setRejecting(false);
    setRejectReason('');
  }

  async function handleApprove() {
    if (!current) return;
    setBusy(true);
    setDecisionError('');
    try {
      const updated = await decideCase(current.caseId, 'approve', null, admin.fullName);
      setCurrent(updated);
      refreshRecent();
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
      const updated = await decideCase(current.caseId, 'reject', rejectReason.trim(), admin.fullName);
      setCurrent(updated);
      setRejecting(false);
      setRejectReason('');
      refreshRecent();
    } catch (err) {
      setDecisionError(err instanceof Error ? err.message : 'Reject failed.');
    } finally {
      setBusy(false);
    }
  }

  const totalHours = current ? current.timesheet.reduce((sum, r) => sum + Number(r.hours || 0), 0) : 0;

  return (
    <div className="admin-shell" data-testid="admin-dashboard">
      <form className="search-row" onSubmit={handleSearch}>
        <input
          data-testid="input-search-caseId"
          placeholder="Search by Case ID, e.g. CASE-1001"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="primary" type="submit" data-testid="btn-search">Search</button>
      </form>
      {searchError && <div className="form-error-banner" data-testid="search-error">{searchError}</div>}

      {recent.length > 0 && (
        <>
          <h3 style={{ fontSize: 13, textTransform: 'uppercase', color: 'var(--muted)' }}>Recent cases</h3>
          <ul className="case-list" data-testid="recent-cases-list">
            {recent.map((c) => (
              <li key={c.caseId} data-testid={`recent-case-${c.caseId}`} onClick={() => openCase(c)}>
                <span>
                  <strong>{c.caseId}</strong> — {c.caseDetails.subject}
                  <div className="meta">{c.requester.fullName} · {c.requester.department}</div>
                </span>
                <span className={`status-badge ${c.status}`}>{c.status}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {current && (
        <div className="card" data-testid="case-detail-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 data-testid="case-detail-id">{current.caseId}</h2>
            <span className={`status-badge ${current.status}`} data-testid="case-detail-status">{current.status}</span>
          </div>

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
            <div className="timesheet-total" data-testid="detail-totalHours">Total hours: {totalHours}</div>
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
      )}
    </div>
  );
}
