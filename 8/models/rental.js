const mongoose = require("mongoose");
const customerSchema = require("./customer");
const Joi = require("joi");

const rentalSchema = new mongoose.Schema({
  customer: { type: customerSchema, required: true },
  movie: {
    type: new mongoose.Schema({
      title: { type: String, required: true, trim: true },
      dailyRentalRate: { type: Number, min: 0, default: 0 },
    }),
    required: true,
  },
  dateOut: { type: Date, required: true, default: Date.now },
  dateReturned: { type: Date },
  rentalFee: { type: Number, min: 0 },
});

function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  };

  return Joi.validate(rental, schema);
}

exports.Rental = mongoose.model("Rental", rentalSchema);
exports.validateRental = validateRental;
