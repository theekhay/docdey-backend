const express = require('express');
const router = express.Router();
const MedicationController = require('@controllers/medications.controller');

router.get('/', MedicationController.index);

router.get('/getActiveMedication', MedicationController.activeMedication);


module.exports = router;