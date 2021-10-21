const express = require("express");
const router = express.Router();
const { createNewUser, getCurrentUser } = require("../controllers/user");
const authorization = require("../middlewares/auth");

router.post("/", createNewUser);

router.get("/me", authorization, getCurrentUser);

module.exports = router;
