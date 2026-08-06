// Hardcoded demo accounts. This is a mock app for automation practice —
// not a real auth system, so plaintext credentials here are fine.
const USERS = [
  { username: 'user1', password: 'User@123', role: 'user', fullName: 'Jordan Rivera', employeeId: 'EMP-1001' },
  { username: 'admin1', password: 'Admin@123', role: 'admin', fullName: 'Casey Morgan', employeeId: 'ADM-2001' },
];

function findUser(username, password) {
  return USERS.find((u) => u.username === username && u.password === password) || null;
}

module.exports = { findUser };
