const Vehicle = require('../models/vehicle');
const Make = require('../models/make');
const Category = require('../models/category');
const { body, validationResult } = require("express-validator");

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
    const [allMakes, allCategories] = await Promise.all([
        Make.find({}).exec(),
        Category.find({}).exec()
    ]);

    res.render('vehicle_form', {
        title: 'Create New Vehicle',
        make_list: allMakes,
        category_list: allCategories,
        vehicle: null,
        errors: []
    });
});

exports.vehicle_create_post = [
    // Validate & sanitize fields
    body('make', 'Make must be selected.')
        .trim()
        .escape()
        .notEmpty(),
    body('category', 'Category must be selected.')
        .trim()
        .escape()
        .notEmpty(),
    body('year', 'Year must be entered.')
        .trim()
        .isLength({ min: 4 })
        .isNumeric()
        .escape(),
    body('model', "Model must be entered.")
        .trim()
        .isLength({ min: 4 })
        .escape(),
    body('vin')
        .if(body('vin').exists({ checkFalsy: true }))
        .trim()
        .escape(),
    body('milage', 'Milage must be entered.')
        .trim()
        .isLength({ min: 1 })
        .isNumeric()
        .escape(),
    body('summary', 'Summary must not be empty.')
        .trim()
        .notEmpty()
        .escape(),
    body('price', 'Price must be entered.')
        .trim()
        .isNumeric()
        .isLength({ min: 3 })
        .escape(),
    body('color', "Color must be entered.")
        .trim()
        .isAlphanumeric()
        .notEmpty()
        .escape(),
    body('condition', 'Condition must be selected.')
        .trim()
        .notEmpty()
        .escape(),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const vehicle = new Vehicle({
            year: req.body.year,
            make: req.body.make,
            model: req.body.model,
            category: req.body.category,
            vin: req.body.vin,
            condition: req.body.condition,
            milage: req.body.milage,
            summary: req.body.summary,
            price: req.body.price,
            color: req.body.color
        });

        if (!errors.isEmpty()) {
            // There are errors, render form again with sanitized values & errors.
            // Grab makes and categories
            const [allMakes, allCategories] = await Promise.all([
                Make.find({}).exec(),
                Category.find({}).exec()
            ]);

            res.render('vehicle_form', {
                title: 'Create New Vehicle',
                make_list: allMakes,
                category_list: allCategories,
                vehicle: vehicle,
                errors: errors.array()
            });
        } else {
            await vehicle.save();
            res.redirect(vehicle.url);
        }
    })
        
];

exports.vehicle_delete_get = asyncHandler(async (req, res, next) => {
    const vehicle = await Vehicle.findById(req.params.id).populate('make category').exec();

    if (vehicle === null) {
        const err = new Error('Vehicle not found!');
        err.status = 404;
        return next(err);
    };

    res.render('vehicle_delete', {
        title: 'Delete Vehicle',
        vehicle: vehicle,
        errors: []
    });
});

exports.vehicle_delete_post = asyncHandler(async (req, res, next) => {
    const vehicle = await Vehicle.findById(req.params.id).populate('make category').exec();

    await Vehicle.findByIdAndRemove(req.body.vehicleid);
    res.redirect('/catalog/vehicles');
});

exports.vehicle_update_get = asyncHandler(async (req, res, next) => {
    const [vehicle, allMakes, allCategories] = await Promise.all([
        Vehicle.findById(req.params.id).exec(),
        Make.find({}).exec(),
        Category.find({}).exec()
    ]);

    res.render('vehicle_form', {
        title: "Update Vehicle",
        vehicle: vehicle,
        make_list: allMakes,
        category_list: allCategories,
        errors: []
    });
});

exports.vehicle_update_post = [
    // Validate & sanitize fields
    body('make', 'Make must be selected.')
        .trim()
        .escape()
        .notEmpty(),
    body('category', 'Category must be selected.')
        .trim()
        .escape()
        .notEmpty(),
    body('year', 'Year must be entered.')
        .trim()
        .isLength({ min: 4 })
        .isNumeric()
        .escape(),
    body('model', "Model must be entered.")
        .trim()
        .isLength({ min: 4 })
        .escape(),
    body('vin')
        .if(body('vin').exists({ checkFalsy: true }))
        .trim()
        .escape(),
    body('milage', 'Milage must be entered.')
        .trim()
        .isLength({ min: 1 })
        .isNumeric()
        .escape(),
    body('summary', 'Summary must not be empty.')
        .trim()
        .notEmpty()
        .escape(),
    body('price', 'Price must be entered.')
        .trim()
        .isNumeric()
        .isLength({ min: 3 })
        .escape(),
    body('color', "Color must be entered.")
        .trim()
        .notEmpty()
        .escape(),
    body('condition', 'Condition must be selected.')
        .trim()
        .notEmpty()
        .escape(),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const vehicle = new Vehicle({
            year: req.body.year,
            make: req.body.make,
            model: req.body.model,
            category: req.body.category,
            vin: req.body.vin,
            condition: req.body.condition,
            milage: req.body.milage,
            summary: req.body.summary,
            price: req.body.price,
            color: req.body.color,
            _id: req.params.id // Required or a new id would be assigned.
        });

        if (!errors.isEmpty()) {
            // There are errors, render form again with sanitized values & errors.
            // Grab makes and categories
            const [allMakes, allCategories] = await Promise.all([
                Make.find({}).exec(),
                Category.find({}).exec()
            ]);

            res.render('vehicle_form', {
                title: 'Create New Vehicle',
                make_list: allMakes,
                category_list: allCategories,
                vehicle: vehicle,
                errors: errors.array()
            });
        } else {
            const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, vehicle, {});
            res.redirect(updatedVehicle.url);
        }
    })
        
];

exports.vehicle_detail = asyncHandler(async (req, res, next) => {
    const vehicle = await Vehicle.findById(req.params.id).populate('make category').exec();
    res.render('vehicle_detail', {
        title: 'Vehicle Details',
        vehicle: vehicle
    });
});

exports.vehicle_list = asyncHandler(async (req, res, next) => {
    const allVehicles = await Vehicle.find({}).populate('make category').exec();

    res.render('vehicle_list', {
        title: 'All Vehicles',
        vehicle_list: allVehicles
    });
});