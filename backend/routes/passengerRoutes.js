const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getProfile, updateProfile } = require('../controllers/passengerController');

router.use(authMiddleware);
router.get('/', getProfile);
router.put('/', updateProfile);

module.exports = router;
