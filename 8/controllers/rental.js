const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const { Rental, validateRental } = require("../models/rental");
const mongoose = require("mongoose");
const Fawn = require("fawn");

Fawn.init(mongoose);

async function getAllRentals(req, res) {
  try {
    const rentals = await Rental.find().sort("-dateOut");
    return res.status(200).send({
      isError: false,
      rentals,
      message: "Get all rentals successfully",
    });
  } catch (error) {
    return res.status(500).send({ isError: true, message: "Server error" });
  }
}

async function createNewRental(req, res) {
  const { error } = validateRental(req.body);
  if (error)
    return res
      .status(400)
      .send({ isError: true, message: error.details[0].message });
  //BAD APPROACH
  //We should check at validateRental()
  //   if (
  //     !mongoose.Types.ObjectId.isValid(req.body.customerId) ||
  //     !mongoose.Types.ObjectId.isValid(req.body.movieId)
  //   )
  //     return res
  //       .status(400)
  //       .send({ isError: true, message: "Invalid customer ID or movie ID" });

  const customer = await Customer.findById(req.body.customerId);
  const movie = await Movie.findById(req.body.movieId);
  if (!customer || !movie)
    return res
      .status(400)
      .send({ isError: true, message: "Not found customer or movie" });

  if (movie.numberInStock === 0)
    return res
      .status(400)
      .send({ isError: true, message: "Movie not in stock" });

  const rental = new Rental({
    customer,
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  try {
    new Fawn.Task()
      .save("rentals", rental) //work directly with collections so we need correct name of collections
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 },
        }
      )
      .run();
    // const result = await rental.save();
    // movie.numberInStock--;
    // movie.save();

    return res
      .status(200)
      .send({ isError: false, rental, message: "Create successfully" }); //although we do not reset the value of rental, but when rental = new Rental
    //mongoose auto add addition properties based on Schema before store to mongodb
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

module.exports = { getAllRentals, createNewRental };
