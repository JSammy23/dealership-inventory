const Category = require('../models/category');
const asyncHandler = require('express-async-handler');

exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find({}).exec();

    res.render('category_list', {
        title: 'All Categories',
        category_list: allCategories
    });
});

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