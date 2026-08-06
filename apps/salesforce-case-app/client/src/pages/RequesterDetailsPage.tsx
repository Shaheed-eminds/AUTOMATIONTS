import { useState } from 'react';
import type { Requester } from '../types';

const DEPARTMENTS = ['Engineering', 'Sales', 'Support', 'Finance', 'HR', 'Executive'];
const PRIORITIES: Requester['priority'][] = ['Low', 'Medium', 'High', 'Critical'];

type Errors = Partial<Record<keyof Requester, boolean>>;

export default function RequesterDetailsPage({
  value,
  onNext,
}: {
  value: Requester;
  onNext: (data: Requester) => void;
}) {
  const [form, setForm] = useState<Requester>(value);
  const [errors, setErrors] = useState<Errors>({});

  function validate(): boolean {
    const e: Errors = {
      fullName: !form.fullName.trim(),
      employeeId: !form.employeeId.trim(),
      email: !/^\S+@\S+\.\S+$/.test(form.email.trim()),
      department: !form.department,
      priority: !form.priority,
    };
    setErrors(e);
    return !Object.values(e).some(Boolean);
  }

  function handleNext() {
    if (validate()) onNext(form);
  }

  return (
    <section data-testid="screen-1">
      <h2>Requester Details</h2>

      <div className={`field-group ${errors.fullName ? 'invalid' : ''}`}>
        <label htmlFor="fullName">Full name</label>
        <input
          id="fullName"
          data-testid="input-fullName"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
        <div className="error-text" data-testid="error-fullName">Full name is required.</div>
      </div>

      <div className={`field-group ${errors.employeeId ? 'invalid' : ''}`}>
        <label htmlFor="employeeId">Employee ID</label>
        <input
          id="employeeId"
          data-testid="input-employeeId"
          value={form.employeeId}
          onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
        />
        <div className="error-text" data-testid="error-employeeId">Employee ID is required.</div>
      </div>

      <div className={`field-group ${errors.email ? 'invalid' : ''}`}>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          data-testid="input-email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <div className="error-text" data-testid="error-email">Enter a valid email address.</div>
      </div>

      <div className={`field-group ${errors.department ? 'invalid' : ''}`}>
        <label htmlFor="department">Department</label>
        <select
          id="department"
          data-testid="select-department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        >
          <option value="">Select a department</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <div className="error-text" data-testid="error-department">Department is required.</div>
      </div>

      <div className={`field-group ${errors.priority ? 'invalid' : ''}`}>
        <label>Priority</label>
        <div className="radio-row" data-testid="radio-priority">
          {PRIORITIES.map((p) => (
            <label key={p}>
              <input
                type="radio"
                name="priority"
                value={p}
                checked={form.priority === p}
                onChange={() => setForm({ ...form, priority: p })}
                data-testid={`radio-priority-${p.toLowerCase()}`}
              />
              {p}
            </label>
          ))}
        </div>
        <div className="error-text" data-testid="error-priority">Select a priority.</div>
      </div>

      <div className="actions">
        <span />
        <button className="primary" data-testid="btn-next-1" onClick={handleNext}>Next</button>
      </div>
    </section>
  );
}
