const Category = require('../models/category');
const Vehicle = require('../models/vehicle');
const asyncHandler = require('express-async-handler');

exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find({}).exec();

    res.render('category_list', {
        title: 'All Categories',
        category_list: allCategories
    });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
    const [category, vehiclesInCategory] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Vehicle.find({ category: req.params.id }).populate('make').exec()
    ]);

    res.render('category_detail', {
        title: 'Category Detail',
        category: category,
        vehicle_list: vehiclesInCategory
    });
})

exports.category_create_get = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Category Create GET');
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Category Create POST');
});

exports.category_delete_get = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Category Delete GET');
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Category Delete POST');
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Category Update GET');
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Category Update POST');
});