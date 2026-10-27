const mockData = require('../models/mockData');

const submitContactMessage = (req, res) => {
  const { name, email, subject, category, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
  }

  const newContact = {
    id: mockData.contacts.length + 1,
    name,
    email,
    subject: subject || 'General Inquiry',
    category: category || 'Flight Inquiry',
    message,
    timestamp: new Date().toISOString()
  };

  mockData.contacts.push(newContact);
  res.status(201).json({
    success: true,
    message: 'Thank you! Your message has been routed to AeroGate Customer Support. Reference ticket #' + (1000 + newContact.id)
  });
};

module.exports = { submitContactMessage };
