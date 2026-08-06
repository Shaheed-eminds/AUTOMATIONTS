import { useState } from 'react';
import type { TimesheetEntry } from '../types';

const PROJECTS = ['Project Alpha', 'Project Beta', 'Project Gamma', 'Internal'];

function emptyEntry(): TimesheetEntry {
  return { date: '', project: '', taskDescription: '', hours: '' };
}

export default function TimesheetPage({
  value,
  onNext,
  onBack,
}: {
  value: TimesheetEntry[];
  onNext: (data: TimesheetEntry[]) => void;
  onBack: () => void;
}) {
  const [rows, setRows] = useState<TimesheetEntry[]>(value.length ? value : [emptyEntry()]);
  const [rowErrors, setRowErrors] = useState<boolean[]>([]);
  const [formError, setFormError] = useState('');

  function updateRow(idx: number, patch: Partial<TimesheetEntry>) {
    setRows(rows.map((r, i) => (i === idx ? { ...r, ...patch } : r)));
  }

  function addRow() {
    setRows([...rows, emptyEntry()]);
  }

  function removeRow(idx: number) {
    if (rows.length === 1) return;
    setRows(rows.filter((_, i) => i !== idx));
  }

  function validate(): boolean {
    const errs = rows.map((r) => {
      const hours = Number(r.hours);
      return !r.date || !r.project || !r.taskDescription.trim() || !r.hours || hours <= 0 || hours > 24;
    });
    setRowErrors(errs);
    const hasError = errs.some(Boolean);
    setFormError(hasError ? 'Fix the highlighted timesheet entries (hours must be between 0.25 and 24).' : '');
    return !hasError;
  }

  function handleNext() {
    if (validate()) onNext(rows);
  }

  const totalHours = rows.reduce((sum, r) => sum + (Number(r.hours) || 0), 0);

  return (
    <section data-testid="screen-3">
      <h2>Timesheet Entries</h2>

      {formError && <div className="form-error-banner" data-testid="timesheet-error">{formError}</div>}

      <table className="timesheet-table" data-testid="timesheet-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Project</th>
            <th>Task description</th>
            <th>Hours</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} data-testid={`timesheet-row-${idx}`} style={rowErrors[idx] ? { outline: '1px solid #c23934' } : undefined}>
              <td>
                <input
                  type="date"
                  data-testid={`input-ts-date-${idx}`}
                  value={row.date}
                  onChange={(e) => updateRow(idx, { date: e.target.value })}
                />
              </td>
              <td>
                <select
                  data-testid={`select-ts-project-${idx}`}
                  value={row.project}
                  onChange={(e) => updateRow(idx, { project: e.target.value })}
                >
                  <option value="">Select project</option>
                  {PROJECTS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="text"
                  data-testid={`input-ts-task-${idx}`}
                  value={row.taskDescription}
                  onChange={(e) => updateRow(idx, { taskDescription: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0.25"
                  max="24"
                  step="0.25"
                  data-testid={`input-ts-hours-${idx}`}
                  value={row.hours}
                  onChange={(e) => updateRow(idx, { hours: e.target.value })}
                />
              </td>
              <td>
                <button
                  type="button"
                  className="remove-row-btn"
                  data-testid={`btn-remove-row-${idx}`}
                  onClick={() => removeRow(idx)}
                  disabled={rows.length === 1}
                  title="Remove entry"
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type="button" className="secondary" data-testid="btn-add-row" onClick={addRow}>+ Add entry</button>

      <div className="timesheet-total" data-testid="timesheet-total">Total hours: {totalHours}</div>

      <div className="actions">
        <button className="secondary" data-testid="btn-back-3" onClick={onBack}>Back</button>
        <button className="primary" data-testid="btn-next-3" onClick={handleNext}>Next</button>
      </div>
    </section>
  );
}
