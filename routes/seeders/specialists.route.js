const express = require('express');
const router = express.Router();
const SpecialistSeeder = require('@seeders/specialists.seeder');

router.post('/create', SpecialistSeeder.seedSpecialists );

module.exports = router; 