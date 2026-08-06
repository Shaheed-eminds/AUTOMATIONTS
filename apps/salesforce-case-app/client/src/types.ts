export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
export type CaseType = 'Incident' | 'Service Request' | 'Change Request';
export type Category = 'Technical' | 'Billing' | 'Access' | 'Other';

export interface Requester {
  fullName: string;
  employeeId: string;
  email: string;
  department: string;
  priority: Priority | '';
}

export interface CaseDetails {
  subject: string;
  category: Category | '';
  caseType: CaseType | '';
  impactLevel: string;
  requestedDate: string;
  description: string;
}

export interface TimesheetEntry {
  date: string;
  project: string;
  taskDescription: string;
  hours: string;
}

export interface Decision {
  action: string;
  reason: string | null;
  decidedAt: string;
  decidedBy: string;
}

export interface CaseRecord {
  caseId: string;
  status: 'Submitted' | 'Approved' | 'Rejected';
  createdAt: string;
  requester: Requester;
  caseDetails: CaseDetails;
  timesheet: TimesheetEntry[];
  totalHours: number;
  decision: Decision | null;
}

export interface AuthUser {
  username: string;
  role: 'user' | 'admin';
  fullName: string;
  employeeId: string;
}
