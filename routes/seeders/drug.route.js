const express = require('express');
const router = express.Router();
const DrugSeeder = require('@seeders/drug.seeder');

router.post('/create', DrugSeeder.seedDrugs);

module.exports = router; 