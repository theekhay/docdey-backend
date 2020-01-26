const express = require('express');
const router = express.Router();
const AppointmentSeeder = require('@seeders/appointments.seeder');

router.post('/create', AppointmentSeeder.seedAppointments);

module.exports = router; 