const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getBaggageRecords, trackByTag } = require('../controllers/baggageController');

router.use(authMiddleware);
router.get('/', getBaggageRecords);
router.get('/:tagId', trackByTag);

module.exports = router;
