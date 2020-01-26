const express = require('express');
const router = express.Router();
const HealthTipSeeder = require('@seeders/healthTip.seeder');

router.post('/create', HealthTipSeeder.seedHealthTips);

module.exports = router; 