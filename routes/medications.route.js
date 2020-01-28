const express = require('express');
const router = express.Router();
const MedicationController = require('@controllers/medications.controller');

router.get('/', MedicationController.index);

router.post('/create', MedicationController.create);

router.get('/getActiveMedication/:userId', MedicationController.activeMedication);


module.exports = router;