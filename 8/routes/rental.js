const express = require("express");
const { getAllRentals, createNewRental } = require("../controllers/rental");
const router = express.Router();

router.get("/", getAllRentals);

router.post("/", createNewRental);

module.exports = router;
