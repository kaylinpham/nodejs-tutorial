const { Genre, validateGenre } = require("../models/genre");

async function getAllGenres(req, res) {
  // throw new Error("cannot get genres");
  const genres = await Genre.find();
  return res
    .status(200)
    .send({ isError: false, genres, message: "Get all genres successfully" });
}

async function getGenreById(req, res) {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send({
      isError: true,
      message: "Not found ID",
    });

  res.status(200).send({ isError: false, genre });
}

async function createNewGenre(req, res) {
  const { error } = validateGenre(req.body);
  if (error)
    return res
      .status(400)
      .send({ isError: true, message: error.details[0].message });

  const genre = new Genre({ name: req.body.name });
  try {
    const result = await genre.save();
    return res
      .status(200)
      .send({ isError: false, genre, message: "Create successfully" });
  } catch (exception) {
    let errors = [];
    for (let key in exception.errors)
      errors.push(exception.errors[key].message);
    res.status(400).send({ isError: true, message: errors.join(", ") });
  }
}

async function updateGenreById(req, res) {
  const { error } = validateGenre(req.body);
  if (error)
    return res
      .status(400)
      .send({ isError: true, message: error.details[0].message });

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      $set: { name: req.body.name },
    },
    { new: true }
  );

  if (!genre)
    return res.status(404).send({
      isError: true,
      message: "Not found ID",
    });

  res
    .status(200)
    .send({ isError: false, genre, message: "Update successfully" });
}

async function removeGenreById(req, res) {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(400).send({ isError: true, message: "Not found ID" });

  res
    .status(200)
    .send({ isError: false, genre, message: "Remove successfully" });
}

module.exports = {
  getAllGenres,
  getGenreById,
  createNewGenre,
  updateGenreById,
  removeGenreById,
};
