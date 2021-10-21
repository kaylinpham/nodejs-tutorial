const express = require("express");
const {
  getAllCustomers,
  createNewCustomer,
  updateCustomerById,
  removeCustomerById,
  getCustomerById,
} = require("../controllers/customer");
const router = express.Router();

router.get("/", getAllCustomers);

router.post("/", createNewCustomer);

router.put("/:id", updateCustomerById);

router.delete("/:id", removeCustomerById);

router.get("/:id", getCustomerById);

module.exports = router;
