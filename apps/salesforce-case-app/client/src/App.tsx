import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RequesterDetailsPage from './pages/RequesterDetailsPage';
import CaseDetailsPage from './pages/CaseDetailsPage';
import TimesheetPage from './pages/TimesheetPage';
import ReviewPage from './pages/ReviewPage';
import SuccessPage from './pages/SuccessPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import StepIndicator from './components/StepIndicator';
import { submitCase } from './api';
import type { AuthUser, CaseDetails, Requester, TimesheetEntry } from './types';

const emptyRequester: Requester = { fullName: '', employeeId: '', email: '', department: '', priority: '' };
const emptyCaseDetails: CaseDetails = {
  subject: '', category: '', caseType: '', impactLevel: '', requestedDate: '', description: '',
};

type Step = 1 | 2 | 3 | 4 | 'success';

export default function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [step, setStep] = useState<Step>(1);
  const [requester, setRequester] = useState<Requester>(emptyRequester);
  const [caseDetails, setCaseDetails] = useState<CaseDetails>(emptyCaseDetails);
  const [timesheet, setTimesheet] = useState<TimesheetEntry[]>([]);
  const [caseId, setCaseId] = useState('');

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
  }

  async function handleSubmitCase() {
    const record = await submitCase(requester, caseDetails, timesheet);
    setCaseId(record.caseId);
    setStep('success');
  }

  if (!user) {
    return (
      <div className="shell">
        <LoginPage onLoggedIn={setUser} />
      </div>
    );
  }

  if (user.role === 'admin') {
    return (
      <div className="shell" style={{ maxWidth: 900 }}>
        <header className="app-header">
          <h1>CasePro</h1>
          <span className="session" data-testid="session-info">
            {user.fullName} (Admin)
            <button className="secondary" data-testid="btn-logout" onClick={handleLogout}>Log out</button>
          </span>
        </header>
        <AdminDashboardPage admin={user} />
      </div>
    );
  }

  return (
    <div className="shell">
      <header className="app-header">
        <h1>CasePro</h1>
        <span className="session" data-testid="session-info">
          {user.fullName}
          <button className="secondary" data-testid="btn-logout" onClick={handleLogout}>Log out</button>
        </span>
      </header>

      {step !== 'success' && <StepIndicator current={step} />}

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
  );
}
