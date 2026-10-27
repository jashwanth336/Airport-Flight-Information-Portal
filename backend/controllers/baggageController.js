const mockData = require('../models/mockData');

const getBaggageRecords = (req, res) => {
  const records = mockData.baggageRecords.filter(b => b.userId === req.user.id);
  res.json({ success: true, count: records.length, records });
};

const trackByTag = (req, res) => {
  const { tagId } = req.params;
  const record = mockData.baggageRecords.find(b => b.tagNumber.toLowerCase() === tagId.toLowerCase());
  if (!record) {
    return res.status(404).json({ success: false, message: 'Baggage tag record not found.' });
  }
  res.json({ success: true, record });
};

module.exports = { getBaggageRecords, trackByTag };
