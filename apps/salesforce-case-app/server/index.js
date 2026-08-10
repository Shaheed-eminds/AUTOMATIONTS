const path = require('path');
const express = require('express');
const cors = require('cors');
const { findUser } = require('./users');
const { createCase, getCase, decideCase, listCases } = require('./store');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  const user = findUser(username, password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }
  const { password: _pw, ...safeUser } = user;
  return res.json({ user: safeUser });
});

app.post('/api/cases', (req, res) => {
  const { requester, caseDetails, timesheet } = req.body || {};
  if (!requester || !caseDetails || !Array.isArray(timesheet) || timesheet.length === 0) {
    return res.status(400).json({ error: 'requester, caseDetails, and at least one timesheet entry are required.' });
  }
  const record = createCase({ requester, caseDetails, timesheet });
  return res.status(201).json({ case: record });
});

app.get('/api/cases', (_req, res) => {
  return res.json({ cases: listCases() });
});

app.get('/api/cases/:caseId', (req, res) => {
  const record = getCase(req.params.caseId.trim().toUpperCase());
  if (!record) {
    return res.status(404).json({ error: `No case found with ID ${req.params.caseId}.` });
  }
  return res.json({ case: record });
});

app.post('/api/cases/:caseId/decision', (req, res) => {
  const { action, reason, decidedBy } = req.body || {};
  if (!['approve', 'reject'].includes(action)) {
    return res.status(400).json({ error: 'action must be "approve" or "reject".' });
  }
  if (action === 'reject' && !reason) {
    return res.status(400).json({ error: 'reason is required to reject a case.' });
  }
  const record = decideCase(req.params.caseId.trim().toUpperCase(), action, reason, decidedBy);
  if (!record) {
    return res.status(404).json({ error: `No case found with ID ${req.params.caseId}.` });
  }
  return res.json({ case: record });
});

// In production the client is built to client/dist and served from here, so
// the deployed app is a single Node service on a single URL (no CORS to
// configure between separate frontend/backend hosts).
const clientDist = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDist));
app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Case app listening on http://localhost:${PORT}`);
});
