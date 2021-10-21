const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");

const userSchema = new mongoose.Schema({
  name: { type: String, minlength: 1, required: true, trim: true, defaul: "" },
  phone: {
    type: String,
    required: true,
    match: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  isAdmin: Boolean,
  // roles:[],
  // operations:[]
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { ..._.pick(this, ["_id", "name", "isAdmin"]) },
    config.get("jwtPrivateKey")
  );
};

function validateUser(user) {
  const schema = {
    // isGold: Joi.boolean(),
    name: Joi.string().min(1),
    phone: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(255).required(),
  };

  return Joi.validate(user, schema);
}

exports.User = mongoose.model("User", userSchema);
exports.validateUser = validateUser;
