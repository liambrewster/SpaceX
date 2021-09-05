const express = require('express');
const router = express.Router();
const launches = require('../controllers/launches');

router.route('/')
    .get(launches.index)


router.get('/upcoming', launches.upcomingLaunch);


router.route('/previous')
    .get(launches.previousLaunch)

module.exports = router;