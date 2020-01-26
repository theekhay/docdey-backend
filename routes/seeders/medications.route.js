const express = require('express');
const router = express.Router();
const MedicationSeeder = require('@seeders/medications.seeder');

router.post('/create', MedicationSeeder.seedMedications);

module.exports = router; 