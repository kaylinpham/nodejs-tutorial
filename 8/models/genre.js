const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    required: true,
    trim: true,
    // unique: true,
  },
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(1).required(),
  };

  return Joi.validate(genre, schema);
}

exports.Genre = mongoose.model("Genre", genreSchema);
exports = { genreSchema, validateGenre };
