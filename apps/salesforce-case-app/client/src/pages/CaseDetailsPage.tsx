import { useState } from 'react';
import type { CaseDetails } from '../types';

const CATEGORIES: CaseDetails['category'][] = ['Technical', 'Billing', 'Access', 'Other'];
const CASE_TYPES: CaseDetails['caseType'][] = ['Incident', 'Service Request', 'Change Request'];
const IMPACT_LEVELS = ['Low', 'Medium', 'High'];

type Errors = Partial<Record<keyof CaseDetails, boolean>>;

export default function CaseDetailsPage({
  value,
  onNext,
  onBack,
}: {
  value: CaseDetails;
  onNext: (data: CaseDetails) => void;
  onBack: () => void;
}) {
  const [form, setForm] = useState<CaseDetails>(value);
  const [errors, setErrors] = useState<Errors>({});

  function validate(): boolean {
    const e: Errors = {
      subject: !form.subject.trim(),
      category: !form.category,
      caseType: !form.caseType,
      description: !form.description.trim(),
    };
    if (form.caseType === 'Incident') e.impactLevel = !form.impactLevel;
    if (form.caseType === 'Change Request') e.requestedDate = !form.requestedDate;
    setErrors(e);
    return !Object.values(e).some(Boolean);
  }

  function handleNext() {
    if (validate()) onNext(form);
  }

  return (
    <section data-testid="screen-2">
      <h2>Case Details</h2>

      <div className={`field-group ${errors.subject ? 'invalid' : ''}`}>
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          data-testid="input-subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />
        <div className="error-text" data-testid="error-subject">Subject is required.</div>
      </div>

      <div className={`field-group ${errors.category ? 'invalid' : ''}`}>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          data-testid="select-category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value as CaseDetails['category'] })}
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <div className="error-text" data-testid="error-category">Category is required.</div>
      </div>

      <div className={`field-group ${errors.caseType ? 'invalid' : ''}`}>
        <label>Case type</label>
        <div className="radio-row" data-testid="radio-caseType">
          {CASE_TYPES.map((t) => (
            <label key={t}>
              <input
                type="radio"
                name="caseType"
                checked={form.caseType === t}
                onChange={() => setForm({ ...form, caseType: t })}
                data-testid={`radio-caseType-${t.replace(/\s+/g, '').toLowerCase()}`}
              />
              {t}
            </label>
          ))}
        </div>
        <div className="error-text" data-testid="error-caseType">Select a case type.</div>

        {form.caseType === 'Incident' && (
          <div className="conditional" data-testid="conditional-incident">
            <div className={`field-group ${errors.impactLevel ? 'invalid' : ''}`}>
              <label htmlFor="impactLevel">Impact level</label>
              <select
                id="impactLevel"
                data-testid="select-impactLevel"
                value={form.impactLevel}
                onChange={(e) => setForm({ ...form, impactLevel: e.target.value })}
              >
                <option value="">Select impact level</option>
                {IMPACT_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
              <div className="error-text" data-testid="error-impactLevel">Impact level is required.</div>
            </div>
          </div>
        )}

        {form.caseType === 'Change Request' && (
          <div className="conditional" data-testid="conditional-changeRequest">
            <div className={`field-group ${errors.requestedDate ? 'invalid' : ''}`}>
              <label htmlFor="requestedDate">Requested date</label>
              <input
                id="requestedDate"
                type="date"
                data-testid="input-requestedDate"
                value={form.requestedDate}
                onChange={(e) => setForm({ ...form, requestedDate: e.target.value })}
              />
              <div className="error-text" data-testid="error-requestedDate">Requested date is required.</div>
            </div>
          </div>
        )}
      </div>

      <div className={`field-group ${errors.description ? 'invalid' : ''}`}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          data-testid="input-description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <div className="error-text" data-testid="error-description">Description is required.</div>
      </div>

      <div className="actions">
        <button className="secondary" data-testid="btn-back-2" onClick={onBack}>Back</button>
        <button className="primary" data-testid="btn-next-2" onClick={handleNext}>Next</button>
      </div>
    </section>
  );
}
