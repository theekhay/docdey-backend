const express = require('express');
const router = express.Router();
const HealthTipController = require('@controllers/healthTips.controller');

//router.get('/', HealthTipController.index);

router.get('/tip', HealthTipController.getRandomTip);

// router.post('/create', HealthTipController.create);

module.exports = router;