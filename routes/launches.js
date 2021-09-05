const express = require('express');
const router = express.Router();
const launches = require('../controllers/launches');

router.get('/', launches.index);
router.get('/upcoming', launches.upcomingLaunch);
router.get('/previous', launches.previousLaunch);

module.exports = router;