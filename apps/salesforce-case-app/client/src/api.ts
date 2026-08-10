import type { AuthUser, CaseDetails, CaseRecord, Requester, TimesheetEntry } from './types';

async function handle<T>(res: Response): Promise<T> {
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.error || 'Request failed.');
  }
  return body as T;
}

export async function login(username: string, password: string): Promise<AuthUser> {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const body = await handle<{ user: AuthUser }>(res);
  return body.user;
}

export async function submitCase(
  requester: Requester,
  caseDetails: CaseDetails,
  timesheet: TimesheetEntry[]
): Promise<CaseRecord> {
  const res = await fetch('/api/cases', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ requester, caseDetails, timesheet }),
  });
  const body = await handle<{ case: CaseRecord }>(res);
  return body.case;
}

export async function fetchCase(caseId: string): Promise<CaseRecord> {
  const res = await fetch(`/api/cases/${encodeURIComponent(caseId)}`);
  const body = await handle<{ case: CaseRecord }>(res);
  return body.case;
}

export async function listCases(): Promise<CaseRecord[]> {
  const res = await fetch('/api/cases');
  const body = await handle<{ cases: CaseRecord[] }>(res);
  return body.cases;
}

export async function decideCase(
  caseId: string,
  action: 'approve' | 'reject',
  reason: string | null,
  decidedBy: string
): Promise<CaseRecord> {
  const res = await fetch(`/api/cases/${encodeURIComponent(caseId)}/decision`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, reason, decidedBy }),
  });
  const body = await handle<{ case: CaseRecord }>(res);
  return body.case;
}
