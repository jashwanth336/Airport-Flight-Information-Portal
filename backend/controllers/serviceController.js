const mockData = require('../models/mockData');

const getAllServices = (req, res) => {
  res.json({ success: true, count: mockData.services.length, services: mockData.services });
};

const getServiceById = (req, res) => {
  const service = mockData.services.find(s => s.id === parseInt(req.params.id, 10));
  if (!service) {
    return res.status(404).json({ success: false, message: 'Airport service not found.' });
  }
  res.json({ success: true, service });
};

module.exports = { getAllServices, getServiceById };
