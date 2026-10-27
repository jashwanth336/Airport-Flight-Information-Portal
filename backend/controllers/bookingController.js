const mockData = require('../models/mockData');

const getUserBookings = (req, res) => {
  const userId = req.user.id;
  const bookings = mockData.bookings.filter(b => b.userId === userId);
  res.json({ success: true, count: bookings.length, bookings });
};

const createBooking = (req, res) => {
  const userId = req.user.id;
  const { flightId, passengerName, passportNumber, cabinClass, seatNumber, mealPreference, luggageCount } = req.body;

  const flight = mockData.flights.find(f => f.id === parseInt(flightId, 10));
  if (!flight) {
    return res.status(404).json({ success: false, message: 'Selected flight does not exist.' });
  }

  const pnr = 'PNR-AG' + Math.floor(1000 + Math.random() * 9000);
  const fare = cabinClass === 'Business' ? flight.businessFare : flight.economyFare;

  const newBooking = {
    id: mockData.bookings.length + 1,
    userId,
    flightId: flight.id,
    pnrNumber: pnr,
    passengerName: passengerName || req.user.name,
    passportNumber: passportNumber || 'P99283411',
    flightNumber: flight.flightNumber,
    airline: flight.airline,
    route: `${flight.originCity} (${flight.originCode}) → ${flight.destinationCity} (${flight.destinationCode})`,
    travelDate: flight.scheduledDeparture.split('T')[0],
    cabinClass: cabinClass || 'Economy',
    seatNumber: seatNumber || '18B',
    mealPreference: mealPreference || 'Standard',
    luggageCount: parseInt(luggageCount, 10) || 1,
    totalFare: fare,
    status: 'Confirmed',
    bookingDate: new Date().toISOString()
  };

  mockData.bookings.push(newBooking);

  // Generate corresponding baggage tracking record
  const bagTag = 'BAG-' + Math.floor(100000 + Math.random() * 900000);
  mockData.baggageRecords.push({
    id: mockData.baggageRecords.length + 1,
    bookingId: newBooking.id,
    userId,
    tagNumber: bagTag,
    pnrNumber: pnr,
    flightNumber: flight.flightNumber,
    bagCount: newBooking.luggageCount,
    weightKg: 23.0 * newBooking.luggageCount,
    status: 'Checked In',
    carouselNumber: flight.baggageCarousel,
    lastUpdated: new Date().toISOString(),
    trackingHistory: [
      { checkpoint: 'Online Web Reservation & Bag Tag Generated', time: new Date().toLocaleTimeString(), completed: true },
      { checkpoint: 'Airport Bag Drop Counter', time: 'Pending', completed: false }
    ]
  });

  res.status(201).json({
    success: true,
    message: 'Flight booked successfully! Boarding pass details generated.',
    booking: newBooking
  });
};

const cancelBooking = (req, res) => {
  const bookingId = parseInt(req.params.id, 10);
  const index = mockData.bookings.findIndex(b => b.id === bookingId && b.userId === req.user.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Booking not found or unauthorized.' });
  }

  mockData.bookings[index].status = 'Cancelled';
  res.json({ success: true, message: 'Flight booking cancelled successfully.', booking: mockData.bookings[index] });
};

const webCheckIn = (req, res) => {
  const bookingId = parseInt(req.params.id, 10);
  const booking = mockData.bookings.find(b => b.id === bookingId && b.userId === req.user.id);
  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking not found.' });
  }

  booking.status = 'Checked-In';
  res.json({ success: true, message: 'Web check-in completed. Boarding pass is now ready!', booking });
};

module.exports = { getUserBookings, createBooking, cancelBooking, webCheckIn };
