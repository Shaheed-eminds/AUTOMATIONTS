import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RequesterDetailsPage from './pages/RequesterDetailsPage';
import CaseDetailsPage from './pages/CaseDetailsPage';
import TimesheetPage from './pages/TimesheetPage';
import ReviewPage from './pages/ReviewPage';
import SuccessPage from './pages/SuccessPage';
import AdminCaseListPage from './pages/AdminCaseListPage';
import AdminCaseDetailPage from './pages/AdminCaseDetailPage';
import StepIndicator from './components/StepIndicator';
import ObjectHeader from './components/ObjectHeader';
import WaffleIcon from './components/WaffleIcon';
import { submitCase } from './api';
import type { AuthUser, CaseDetails, Requester, TimesheetEntry } from './types';

const emptyRequester: Requester = { fullName: '', employeeId: '', email: '', department: '', priority: '' };
const emptyCaseDetails: CaseDetails = {
  subject: '', category: '', caseType: '', impactLevel: '', requestedDate: '', description: '',
};

type Step = 1 | 2 | 3 | 4 | 'success';
type AdminView = 'list' | 'detail';

function initials(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

export default function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [step, setStep] = useState<Step>(1);
  const [requester, setRequester] = useState<Requester>(emptyRequester);
  const [caseDetails, setCaseDetails] = useState<CaseDetails>(emptyCaseDetails);
  const [timesheet, setTimesheet] = useState<TimesheetEntry[]>([]);
  const [caseId, setCaseId] = useState('');
  const [adminView, setAdminView] = useState<AdminView>('list');
  const [selectedCaseId, setSelectedCaseId] = useState('');

  function resetWizard() {
    setRequester(emptyRequester);
    setCaseDetails(emptyCaseDetails);
    setTimesheet([]);
    setCaseId('');
    setStep(1);
  }

  function handleLogout() {
    setUser(null);
    resetWizard();
    setAdminView('list');
    setSelectedCaseId('');
  }

  async function handleSubmitCase() {
    const record = await submitCase(requester, caseDetails, timesheet);
    setCaseId(record.caseId);
    setStep('success');
  }

  if (!user) {
    return (
      <div className="lightning-login-bg">
        <div className="login-shell">
          <div className="login-brand">
            <div className="object-icon">C</div>
            <span className="wordmark">CasePro</span>
          </div>
          <LoginPage onLoggedIn={setUser} />
        </div>
      </div>
    );
  }

  const header = (
    <header className="lightning-header">
      <div className="lightning-header-left">
        <WaffleIcon />
        <span className="lightning-brand">CasePro</span>
      </div>
      <div className="lightning-header-right">
        <span className="user-chip" data-testid="session-info">
          <span className="avatar">{initials(user.fullName)}</span>
          {user.fullName}
          {user.role === 'admin' && <span className="role-tag">Admin</span>}
        </span>
        <button className="logout-link" data-testid="btn-logout" onClick={handleLogout}>Log out</button>
      </div>
    </header>
  );

  if (user.role === 'admin') {
    return (
      <div>
        {header}
        <div className="admin-shell">
          {adminView === 'list' ? (
            <>
              <ObjectHeader icon="C" title="Cases" subtitle="Search, review, and action submitted cases" />
              <AdminCaseListPage
                onOpenCase={(id) => {
                  setSelectedCaseId(id);
                  setAdminView('detail');
                }}
              />
            </>
          ) : (
            <AdminCaseDetailPage
              caseId={selectedCaseId}
              admin={user}
              onBack={() => setAdminView('list')}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {header}
      <div className="shell">
        {step !== 'success' && (
          <>
            <ObjectHeader icon="C" eyebrow="New" title="Case" subtitle="Submit a case with supporting timesheet entries" />
            <StepIndicator current={step} />
          </>
        )}

        <div className="card" data-testid="card">
          {step === 1 && (
            <RequesterDetailsPage
              value={requester}
              onNext={(data) => { setRequester(data); setStep(2); }}
            />
          )}
          {step === 2 && (
            <CaseDetailsPage
              value={caseDetails}
              onNext={(data) => { setCaseDetails(data); setStep(3); }}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <TimesheetPage
              value={timesheet}
              onNext={(data) => { setTimesheet(data); setStep(4); }}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <ReviewPage
              requester={requester}
              caseDetails={caseDetails}
              timesheet={timesheet}
              onBack={() => setStep(3)}
              onJump={(s) => setStep(s)}
              onSubmit={handleSubmitCase}
            />
          )}
          {step === 'success' && <SuccessPage caseId={caseId} onRestart={resetWizard} />}
        </div>
      </div>
    </div>
  );
}
