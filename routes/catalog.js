const express = require("express");
const router = express.Router();

// Require controller modules
const vehicleController = require('../controllers/vehicleController');
const makeController = require('../controllers/makeController');

/// VEHCILE ROUTES ///

// GET catalog home page
router.get('/', vehicleController.index);

// GET request for creating vehicle. NOTE This must come before route that uses id for vehicle
router.get('/vehicle/create', vehicleController.vehicle_create_get);

// POST for creating vehicle.
router.post('/vehicle/create', vehicleController.vehicle_create_post);

// GET request to delete vehicle
router.get('/vehicle/:id/delete', vehicleController.vehicle_delete_get);

// POST request for deleting vehicle.
router.post('/vehicle/:id/delete', vehicleController.vehicle_delete_post);

// GET request to update vehicle.
router.get("/vehicle/:id/update", vehicleController.vehicle_update_get);

// POST request to update vehicle.
router.post("/vehicle/:id/update", vehicleController.vehicle_update_post);

// GET request for one vehicle.
router.get("/vehicle/:id", vehicleController.vehicle_detail);

// GET request for list of all vehicle items.
router.get("/vehicles", vehicleController.vehicle_list);

/// Make Routes ///

// GET request for list of all makes.
router.get('/makes', makeController.make_list);

// GET request to create make
router.get('/make/create', makeController.make_create_get);

// POST request to create make
router.post('/make/create', makeController.make_create_post);

// GET request to delete make
router.get('/make/:id/delete', makeController.make_delete_get);

// POST request for deleting make.
router.post('/make/:id/delete', makeController.make_delete_post);

// GET request to update make.
router.get("/make/:id/update", makeController.make_update_get);

// POST request to update make.
router.post("/make/:id/update", makeController.make_update_post);

module.exports = router;