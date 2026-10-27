const mockData = require('../models/mockData');

const getAllFlights = (req, res) => {
  let results = [...mockData.flights];
  const { type, airline, status, search } = req.query;

  if (type) {
    results = results.filter(f => f.flightType.toLowerCase() === type.toLowerCase());
  }
  if (airline) {
    results = results.filter(f => f.airline.toLowerCase().includes(airline.toLowerCase()));
  }
  if (status) {
    results = results.filter(f => f.status.toLowerCase() === status.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(f => 
      f.flightNumber.toLowerCase().includes(q) ||
      f.originCity.toLowerCase().includes(q) ||
      f.destinationCity.toLowerCase().includes(q) ||
      f.airline.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, count: results.length, flights: results });
};

const getFlightById = (req, res) => {
  const flight = mockData.flights.find(f => f.id === parseInt(req.params.id, 10));
  if (!flight) {
    return res.status(404).json({ success: false, message: 'Flight not found.' });
  }
  res.json({ success: true, flight });
};

module.exports = { getAllFlights, getFlightById };
