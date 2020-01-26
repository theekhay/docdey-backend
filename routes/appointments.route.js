const express = require('express');
const router = express.Router();
const AppointmentController = require('@controllers/appointments.controller');

router.get('/', AppointmentController.index ) ;

router.get('/create', AppointmentController.create ) ;

router.get('/:appointmentId', AppointmentController.view );

router.patch('/:appointmentId', AppointmentController.update );

router.delete('/:appointmentId', AppointmentController.softdelete );

module.exports = router; 