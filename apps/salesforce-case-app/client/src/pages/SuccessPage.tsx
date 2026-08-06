export default function SuccessPage({ caseId, onRestart }: { caseId: string; onRestart: () => void }) {
  return (
    <section data-testid="screen-success">
      <div className="success-screen">
        <h2>Case submitted!</h2>
        <p>Your case has been created and is pending approval.</p>
        <div className="id" data-testid="case-id">{caseId}</div>
        <div className="actions" style={{ justifyContent: 'center' }}>
          <button className="primary" data-testid="btn-restart" onClick={onRestart}>Submit another case</button>
        </div>
      </div>
    </section>
  );
}
