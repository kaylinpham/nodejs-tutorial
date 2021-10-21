const { Customer, validateCustomer } = require("../models/customer");

async function getAllCustomers(req, res) {
  try {
    const customers = await Customer.find();
    return res.status(200).send({
      isError: false,
      customers,
      message: "Get all customers successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ isError: true, message: "Server error" });
  }
}

async function getCustomerById(req, res) {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer)
      return res.status(404).send({
        isError: true,
        message: "Not found ID",
      });

    res.status(200).send({ isError: false, customer });
  } catch (exception) {
    res.status(400).send({
      isError: true,
      message: exception.message,
    });
  }
}

async function createNewCustomer(req, res) {
  const { error } = validateCustomer(req.body);
  if (error)
    return res
      .status(400)
      .send({ isError: true, message: error.details[0].message });

  const customer = new Customer(req.body);
  try {
    const result = await customer.save();
    return res
      .status(200)
      .send({ isError: false, customer, message: "Create successfully" });
  } catch (exception) {
    if (exception.code === 11000) {
      const message = exception.keyPattern.hasOwnProperty("phone")
        ? "Phone number is already used or not valid format"
        : "Update failed";
      res.status(400).send({
        isError: true,
        message,
      });
    } else {
      let errors = [];
      for (field in exception.errors)
        errors.push(exception.errors[field].message);
      res.status(400).send({
        isError: true,
        message: errors.join(", "),
      });
    }
  }
}

async function updateCustomerById(req, res) {
  const { error } = validateCustomer(req.body);
  if (error)
    return res
      .status(400)
      .send({ isError: true, message: error.details[0].message });
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body },
      },
      { new: true }
    );

    if (!customer)
      return res.status(404).send({
        isError: true,
        message: "Not found ID",
      });

    res
      .status(200)
      .send({ isError: false, customer, message: "Update successfully" });
  } catch (exception) {
    if (exception.code === 11000) {
      const message = exception.keyPattern.hasOwnProperty("phone")
        ? "Phone number is already used or not valid format"
        : "Update failed";
      res.status(400).send({
        isError: true,
        message,
      });
    } else {
      let errors = [];
      for (field in exception.errors)
        errors.push(exception.errors[field].message);
      res.status(400).send({
        isError: true,
        message: errors.join(", "),
      });
    }
  }
}

async function removeCustomerById(req, res) {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res.status(400).send({ isError: true, message: "Not found ID" });

  res
    .status(200)
    .send({ isError: false, customer, message: "Remove successfully" });
}

module.exports = {
  getAllCustomers,
  getCustomerById,
  createNewCustomer,
  updateCustomerById,
  removeCustomerById,
};
