const mockData = require('../models/mockData');

const getProfile = (req, res) => {
  const user = mockData.users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'Passenger profile not found.' });
  }
  const { passwordHash, ...safeProfile } = user;
  res.json({ success: true, profile: safeProfile });
};

const updateProfile = (req, res) => {
  const user = mockData.users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'Passenger profile not found.' });
  }

  const { name, phone, passportNumber, nationality } = req.body;
  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (passportNumber) user.passportNumber = passportNumber;
  if (nationality) user.nationality = nationality;

  const { passwordHash, ...safeProfile } = user;
  res.json({ success: true, message: 'Profile updated successfully.', profile: safeProfile });
};

module.exports = { getProfile, updateProfile };
