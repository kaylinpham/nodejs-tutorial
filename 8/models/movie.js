const mongoose = require("mongoose");
const genreSchema = require("./genre");
const Joi = require("joi");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: { type: Number, min: 0, default: 0 },
  dailyRentalRate: { type: Number, min: 0, default: 0 },
});

function validateMovie(movie) {
  const schema = {
    title: Joi.string().required(),
    genreId: Joi.objectId(),
    numberInStock: Joi.number().min(0),
    dailyRentalRate: Joi.number().min(0),
  };

  return Joi.validate(movie, schema);
}

exports.Movie = mongoose.model("Movie", movieSchema);
exports.validateMovie = validateMovie;
