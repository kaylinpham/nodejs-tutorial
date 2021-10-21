const { Movie, validateMovie } = require("../models/movie");
const { Genre } = require("../models/genre");

async function getAllMovies(req, res) {
  try {
    const movies = await Movie.find();
    return res.status(200).send({
      isError: false,
      movies,
      message: "Get all movies successfully",
    });
  } catch (error) {
    return res.status(500).send({ isError: true, message: "Server error" });
  }
}

async function getMovieById(req, res) {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(404).send({
        isError: true,
        message: "Not found ID",
      });

    res.status(200).send({ isError: false, movie });
  } catch (exception) {
    res.status(400).send({
      isError: true,
      message: exception.message,
    });
  }
}

async function createNewMovie(req, res) {
  const { error } = validateMovie(req.body);
  if (error)
    return res
      .status(400)
      .send({ isError: true, message: error.details[0].message });

  const genre = await Genre.findById(req.body.genreId);
  if (!genre)
    return res.status(400).send({ isError: true, message: "Invalid genre" });

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  try {
    await movie.save();
    return res
      .status(200)
      .send({ isError: false, movie, message: "Create successfully" });
  } catch (exception) {
    let errors = [];
    for (field in exception.errors)
      errors.push(exception.errors[field].message);
    res.status(400).send({
      isError: true,
      message: errors.join(", "),
    });
  }
}

async function updateMovieById(req, res) {
  const { error } = validateMovie(req.body);
  if (error)
    return res
      .status(400)
      .send({ isError: true, message: error.details[0].message });
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body },
      },
      { new: true }
    );

    if (!movie)
      return res.status(404).send({
        isError: true,
        message: "Not found ID",
      });

    res
      .status(200)
      .send({ isError: false, movie, message: "Update successfully" });
  } catch (exception) {
    let errors = [];
    for (field in exception.errors)
      errors.push(exception.errors[field].message);
    res.status(400).send({
      isError: true,
      message: errors.join(", "),
    });
  }
}

async function removeMovieById(req, res) {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie)
    return res.status(400).send({ isError: true, message: "Not found ID" });

  res
    .status(200)
    .send({ isError: false, movie, message: "Remove successfully" });
}

module.exports = {
  getAllMovies,
  getMovieById,
  createNewMovie,
  updateMovieById,
  removeMovieById,
};
