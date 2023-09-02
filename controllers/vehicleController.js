const Vehicle = require('../models/vehicle');

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    res.send("Not Implemented: Inventory Count")
});