const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  isGold: { type: Boolean, required: true, default: false },
  name: { type: String, minlength: 1, required: true, trim: true, defaul: "" },
  phone: {
    type: String,
    required: true,
    match: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
    trim: true,
    unique: [true, "Phone number is already used or not valid format"],
  },
});

function validateCustomer(customer) {
  const schema = {
    isGold: Joi.boolean(),
    name: Joi.string().min(1),
    phone: Joi.string(),
  };

  return Joi.validate(customer, schema);
}

exports.Customer = mongoose.model("Customer", customerSchema);
exports = { customerSchema, validateCustomer };
