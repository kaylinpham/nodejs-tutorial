const express = require("express");
const {
  getAllMovies,
  createNewMovie,
  updateMovieById,
  removeMovieById,
  getMovieById,
} = require("../controllers/movie");
const router = express.Router();

router.get("/", getAllMovies);

router.post("/", createNewMovie);

router.put("/:id", updateMovieById);

router.delete("/:id", removeMovieById);

router.get("/:id", getMovieById);

module.exports = router;
