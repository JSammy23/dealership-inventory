const Vehicle = require('../models/vehicle');
const Make = require('../models/make');
const Category = require('../models/category');

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    const [numVehicles, numMakes, numCategory] = await Promise.all([
        Vehicle.countDocuments({}).exec(),
        Make.countDocuments({}).exec(),
        Category.countDocuments({}).exec()
    ]);

    res.render('index', {
        title: "Dealership Inventory",
        vehicle_count: numVehicles,
        make_count: numMakes,
        category_count: numCategory,
    });
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