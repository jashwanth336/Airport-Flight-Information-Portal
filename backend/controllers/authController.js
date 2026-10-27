const jwt = require('jsonwebtoken');
const mockData = require('../models/mockData');

const register = (req, res) => {
  const { name, email, phone, password, passportNumber, nationality } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
  }

  const existing = mockData.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
  }

  const newUser = {
    id: mockData.users.length + 1,
    name,
    email,
    phone: phone || '',
    passwordHash: password, // For college demo; use bcrypt.hash in production
    passportNumber: passportNumber || 'P' + Math.floor(10000000 + Math.random() * 90000000),
    nationality: nationality || 'Not Specified',
    frequentFlyerNumber: 'AG-' + Math.floor(100000 + Math.random() * 900000),
    milesBalance: 500
  };

  mockData.users.push(newUser);
  res.status(201).json({
    success: true,
    message: 'Passenger registered successfully. Please login with your credentials.',
    user: { id: newUser.id, name: newUser.name, email: newUser.email }
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const user = mockData.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  // Simplified demo verification
  if (password !== 'password123' && user.passwordHash !== password) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET || 'aerogate_super_secret_jwt_key_2026',
    { expiresIn: '8h' }
  );

  res.json({
    success: true,
    message: 'Login successful.',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      passportNumber: user.passportNumber,
      frequentFlyerNumber: user.frequentFlyerNumber,
      milesBalance: user.milesBalance
    }
  });
};

module.exports = { register, login };
