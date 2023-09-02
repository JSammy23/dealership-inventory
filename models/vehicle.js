const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
    year: { type: Number, required: true, min: 1900, max: 2030 },
    make: { type: Schema.Types.ObjectId, ref: 'Make', required: true, maxLength: 100 },
    model: { type: String, required: true, maxLength: 100 },
    category: { type: Schema.Types.ObjectId, ref: 'category', required: true },
    vin: { type: String, maxLength: 30 },
    condition: { type: String, enum: ['new', 'used'], required: true },
    milage: { type: Number, max: 2000000, required: true },
    summary: { type: String },
    price: { type: Number, required: true },
    color: { type: String, maxLength: 100 },
});

// Virtual for vehicle URL
VehicleSchema.virtual('url').get(function () {
    return `/catalog/vehicle/${this._id}`;
});

// Virtual for vehicle title
VehicleSchema.virtual('title').get(function () {
    return `${this.make} ${this.model}`;
});

module.exports = mongoose.model('Vehicle', VehicleSchema);