import { useEffect, useMemo, useState } from 'react';
import { fetchCase, listCases } from '../api';
import type { CaseRecord } from '../types';

type StatusFilter = 'All' | 'Submitted' | 'Approved' | 'Rejected';
const FILTERS: StatusFilter[] = ['All', 'Submitted', 'Approved', 'Rejected'];

export default function AdminCaseListPage({ onOpenCase }: { onOpenCase: (caseId: string) => void }) {
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [filter, setFilter] = useState<StatusFilter>('All');
  const [searchId, setSearchId] = useState('');
  const [searchError, setSearchError] = useState('');
  const [searching, setSearching] = useState(false);

  async function loadCases() {
    setLoading(true);
    setLoadError('');
    try {
      setCases(await listCases());
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Could not load cases.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCases();
  }, []);

  const stats = useMemo(
    () => ({
      total: cases.length,
      submitted: cases.filter((c) => c.status === 'Submitted').length,
      approved: cases.filter((c) => c.status === 'Approved').length,
      rejected: cases.filter((c) => c.status === 'Rejected').length,
    }),
    [cases]
  );

  const visibleCases = filter === 'All' ? cases : cases.filter((c) => c.status === filter);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchError('');
    if (!searchId.trim()) {
      setSearchError('Enter a Case ID to search.');
      return;
    }
    setSearching(true);
    try {
      const record = await fetchCase(searchId.trim());
      onOpenCase(record.caseId);
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : 'Search failed.');
    } finally {
      setSearching(false);
    }
  }

  return (
    <div data-testid="admin-dashboard">
      <div className="stat-tiles" data-testid="stat-tiles">
        <div className="stat-tile" data-testid="stat-total">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total cases</span>
        </div>
        <div className="stat-tile stat-submitted" data-testid="stat-submitted">
          <span className="stat-value">{stats.submitted}</span>
          <span className="stat-label">Pending approval</span>
        </div>
        <div className="stat-tile stat-approved" data-testid="stat-approved">
          <span className="stat-value">{stats.approved}</span>
          <span className="stat-label">Approved</span>
        </div>
        <div className="stat-tile stat-rejected" data-testid="stat-rejected">
          <span className="stat-value">{stats.rejected}</span>
          <span className="stat-label">Rejected</span>
        </div>
      </div>

      <form className="search-row" onSubmit={handleSearch}>
        <input
          data-testid="input-search-caseId"
          placeholder="Jump to a Case ID, e.g. CASE-1001"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="primary" type="submit" data-testid="btn-search" disabled={searching}>
          {searching ? 'Searching…' : 'Search'}
        </button>
      </form>
      {searchError && <div className="form-error-banner" data-testid="search-error">{searchError}</div>}

      <div className="filter-tabs" data-testid="filter-tabs">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={`filter-tab ${filter === f ? 'active' : ''}`}
            data-testid={`filter-tab-${f.toLowerCase()}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="card" data-testid="case-table-card">
        {loading && <p className="hint">Loading cases…</p>}
        {loadError && <div className="form-error-banner" data-testid="load-error">{loadError}</div>}
        {!loading && !loadError && visibleCases.length === 0 && (
          <p className="hint" data-testid="empty-state">No cases match this filter yet.</p>
        )}
        {!loading && visibleCases.length > 0 && (
          <table className="case-table" data-testid="case-table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Subject</th>
                <th>Requester</th>
                <th>Department</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {visibleCases.map((c) => (
                <tr key={c.caseId} data-testid={`case-row-${c.caseId}`} onClick={() => onOpenCase(c.caseId)}>
                  <td className="case-id-cell">{c.caseId}</td>
                  <td>{c.caseDetails.subject}</td>
                  <td>{c.requester.fullName}</td>
                  <td>{c.requester.department}</td>
                  <td>{c.requester.priority}</td>
                  <td><span className={`status-badge ${c.status}`}>{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
