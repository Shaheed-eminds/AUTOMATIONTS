// In-memory case store. Resets whenever the server restarts — this is a
// mock backend for automation practice, not a persistence layer.
const cases = new Map();
let sequence = 1000;

function generateCaseId() {
  sequence += 1;
  return `CASE-${sequence}`;
}

function createCase(payload) {
  const caseId = generateCaseId();
  const record = {
    caseId,
    status: 'Submitted',
    createdAt: new Date().toISOString(),
    requester: payload.requester,
    caseDetails: payload.caseDetails,
    timesheet: payload.timesheet,
    totalHours: payload.timesheet.reduce((sum, entry) => sum + Number(entry.hours || 0), 0),
    decision: null, // { action: 'Approved' | 'Rejected', reason, decidedAt, decidedBy }
  };
  cases.set(caseId, record);
  return record;
}

function getCase(caseId) {
  return cases.get(caseId) || null;
}

function decideCase(caseId, action, reason, decidedBy) {
  const record = cases.get(caseId);
  if (!record) return null;
  record.status = action === 'approve' ? 'Approved' : 'Rejected';
  record.decision = {
    action: record.status,
    reason: reason || null,
    decidedAt: new Date().toISOString(),
    decidedBy,
  };
  return record;
}

function listCases() {
  return Array.from(cases.values()).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

module.exports = { createCase, getCase, decideCase, listCases };
