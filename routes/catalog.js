const express = require("express");
const router = express.Router();

// Require controller modules
const vehicleController = require('../controllers/vehicleController');

// GET catalog home page
router.get('/', vehicleController.index);

module.exports = router;