const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUserBookings, createBooking, cancelBooking, webCheckIn } = require('../controllers/bookingController');

router.use(authMiddleware);
router.get('/', getUserBookings);
router.post('/', createBooking);
router.delete('/:id', cancelBooking);
router.put('/:id/checkin', webCheckIn);

module.exports = router;
