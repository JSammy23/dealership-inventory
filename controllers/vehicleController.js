const Vehicle = require('../models/vehicle');

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    res.send("Not Implemented: Inventory Count")
});

exports.vehicle_create_get = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Create vehicle GET');
});

exports.vehicle_create_post = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Create vehicle POST');
});

exports.vehicle_delete_get = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Delete vehicle GET');
});

exports.vehicle_delete_post = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Delete vehicle POST');
});

exports.vehicle_update_get = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Update vehicle GET');
});

exports.vehicle_update_post = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Update vehicle POST');
});

exports.vehicle_detail = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Vehicle detail: ' + req.params.id);
});

exports.vehicle_list = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Vehicle list');
});