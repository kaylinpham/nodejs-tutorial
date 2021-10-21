const express = require("express");
const {
  getAllGenres,
  getGenreById,
  createNewGenre,
  updateGenreById,
  removeGenreById,
} = require("../controllers/genre");
const admin = require("../middlewares/admin");
const asyncMiddleware = require("../middlewares/async");
const authorization = require("../middlewares/auth");
const router = express.Router();

router.get("/", asyncMiddleware(getAllGenres));
// router.get("/", getAllGenres); //with npm i express-async-errors, we don't need above version -> Recommend

router.post("/", authorization, createNewGenre);

router.put("/:id", updateGenreById);

router.delete("/:id", [authorization, admin], removeGenreById);

router.get("/:id", getGenreById);

module.exports = router;
