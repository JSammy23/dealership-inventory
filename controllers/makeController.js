const Make = require('../models/make');
const asyncHandler = require('express-async-handler');

exports.make_list = asyncHandler(async (req, res, next) => {
    const allMakes = await Make.find({}).exec();

    res.render('make_list', {
        title: 'All Makes',
        make_list: allMakes
    });
});

exports.make_create_get = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Create Make GET');
});

exports.make_create_post = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Create Make POST');
});

exports.make_delete_get = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Delete Make GET');
});

exports.make_delete_post = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Delete Make POST');
});

exports.make_update_get = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Update Make GET');
});

exports.make_update_post = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Update Make POST');
});