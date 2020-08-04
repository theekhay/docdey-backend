const express = require('express');
const router = express.Router();
const DrugController = require('@controllers/drugs.controller');

router.get('/', DrugController.index);

router.post('/create', DrugController.create);

router.get('/interaction/:drug1/:drug2', DrugController.getInteraction );


module.exports = router;