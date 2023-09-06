const Make = require('../models/make');
const Vehicle = require('../models/vehicle');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

exports.make_list = asyncHandler(async (req, res, next) => {
    const allMakes = await Make.find({}).exec();

    res.render('make_list', {
        title: 'All Makes',
        make_list: allMakes
    });
});

exports.make_detail = asyncHandler(async (req, res, next) => {
    const [make, vehicleByMake] = await Promise.all([
        Make.findById(req.params.id).exec(),
        Vehicle.find({ make: req.params.id }).populate('category').exec()
    ]);

    res.render('make_detail', {
        title: 'Make Details',
        make: make,
        vehicle_list: vehicleByMake
    });
});

exports.make_create_get = asyncHandler(async (req, res, next) => {
    res.render('make_form', {
        title: 'Add new Make',
        make: null,
        errors: []
    });
});

exports.make_create_post = [
    body('name', 'Name must be entered.')
        .trim()
        .isAlphanumeric()
        .escape()
        .customSanitizer(value => {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }),
    body('origin', 'Please enter country of origin.')
        .trim()
        .isAlphanumeric()
        .escape(),
    body('summary', 'Please enter a brief summary.')
        .trim()
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const make = new Make({
            name: req.body.name,
            origin: req.body.origin,
            summary: req.body.summary,
            _id: req.params.id
        });

        if (!errors.isEmpty()) {
            // There are errors, render form again with sanitized values & errors.
            res.render('make_form', {
                title: 'Add new Make',
                make: make,
                errors: errors.array()
            });
        } else {
            await make.save();
            res.redirect(make.url);
        }
    })
]

exports.make_delete_get = asyncHandler(async (req, res, next) => {
    const [make, vehiclesByMake] = await Promise.all([
        Make.findById(req.params.id).exec(),
        Vehicle.find({ make: req.params.id }).exec()
    ]);

    if (make === null) {
        const err = new Error('Make not found');
        err.status = 404;
        return next(err);
    };

    res.render('make_delete', {
        title: 'Delete Make',
        make: make,
        vehicle_list: vehiclesByMake,
        errors: []
    });

});

exports.make_delete_post = asyncHandler(async (req, res, next) => {
    const [make, vehiclesByMake] = await Promise.all([
        Make.findById(req.params.id).exec(),
        Vehicle.find({ make: req.params.id }).exec()
    ]);

    if (vehiclesByMake.length > 0) {
        // Make has vehicles in stock that must be deleted first.
        res.render('make_delete', {
            title: 'Delete Make',
            make: make,
            vehicle_list: vehiclesByMake,
            errors: []
        });
    } else {
        await Make.findByIdAndRemove(req.body.makeid);
        res.redirect('/catalog/makes');
    }
});

exports.make_update_get = asyncHandler(async (req, res, next) => {
    const make = await Make.findById(req.params.id);

    res.render('make_form', {
        title: 'Update Make',
        make: make,
        errors: []
    });
});

exports.make_update_post = [
    body('name', 'Name must be entered.')
        .trim()
        .isAlphanumeric()
        .escape()
        .customSanitizer(value => {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }),
    body('origin', 'Please enter country of origin.')
        .trim()
        .isAlphanumeric()
        .escape(),
    body('summary', 'Please enter a brief summary.')
        .trim()
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const make = new Make({
            name: req.body.name,
            origin: req.body.origin,
            summary: req.body.summary,
            _id: req.params.id
        });

        if (!errors.isEmpty()) {
            // There are errors, render form again with sanitized values & errors.
            res.render('make_form', {
                title: 'Update Make',
                make: make,
                errors: errors.array()
            });
        } else {
            const result = await Make.findByIdAndUpdate(req.params.id, make, {});
            res.redirect(make.url);
        }
    })
]