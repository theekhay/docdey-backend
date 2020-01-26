const express = require('express');
const router = express.Router();
const SpecialistsController = require('@controllers/specialists.controller');

router.get('/', SpecialistsController.index) ;

router.post('/create', SpecialistsController.create );

// router.patch('/:specialistId', SpecialistsController.update );

// router.get('/:specialistId', SpecialistsController.view );

// router.delete('/:specialistId', SpecialistsController.softdelete );

// router.get('/code/generate', SpecialistsController.generateEventCode );

// router.get('/code/:eventCode', SpecialistsController.generateEventCode );

// router.patch('/follow/:specialistId', SpecialistsController.follow );

// router.patch('/unfollow/:specialistId', SpecialistsController.unfollow );

// router.post('/invite/setattendingstatus/:specialistId', SpecialistsController.confirmAttendance );

// router.patch('/notifications/mute/:specialistId', SpecialistsController.muteNotifications );

module.exports = router;