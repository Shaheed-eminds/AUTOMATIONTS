import { useState } from 'react';
import { login } from '../api';
import type { AuthUser } from '../types';

export default function LoginPage({ onLoggedIn }: { onLoggedIn: (user: AuthUser) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password) {
      setError('Enter both username and password.');
      return;
    }
    setSubmitting(true);
    try {
      const user = await login(username.trim(), password);
      onLoggedIn(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-shell" data-testid="login-screen">
      <div className="login-card">
        <h1>CasePro</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="form-error-banner" data-testid="login-error">{error}</div>}
          <div className="field-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              data-testid="input-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              data-testid="input-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="actions" style={{ justifyContent: 'flex-end' }}>
            <button type="submit" className="primary" data-testid="btn-login" disabled={submitting}>
              {submitting ? 'Signing in…' : 'Sign In'}
            </button>
          </div>
        </form>
        <div className="login-hint" data-testid="login-hint">
          Demo accounts — User: <strong>user1</strong> / <strong>User@123</strong><br />
          Admin: <strong>admin1</strong> / <strong>Admin@123</strong>
        </div>
      </div>
    </div>
  );
}
