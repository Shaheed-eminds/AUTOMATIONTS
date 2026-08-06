const STEPS = ['1. Requester', '2. Case Details', '3. Timesheet', '4. Review'];

export default function StepIndicator({ current }: { current: number }) {
  return (
    <div className="steps" data-testid="step-indicator">
      {STEPS.map((label, idx) => {
        const step = idx + 1;
        const cls = ['step-chip', step === current ? 'active' : '', step < current ? 'done' : ''].join(' ').trim();
        return (
          <div key={step} className={cls} data-testid={`step-chip-${step}`} data-step={step}>
            {label}
          </div>
        );
      })}
    </div>
  );
}
