const express = require('express');
const router = express.Router();
const candidatesController = require('../controllers/candidatesController');

router.get('/', candidatesController.getAllCandidates);
router.post('/', candidatesController.addCandidate);
router.put('/:id', candidatesController.updateCandidate);
router.delete('/:id', candidatesController.deleteCandidate);


module.exports = router;
