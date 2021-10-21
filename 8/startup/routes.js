const customers = require("../routes/customer");
const movies = require("../routes/movie");
const rentals = require("../routes/rental");
const users = require("../routes/user");
const auth = require("../routes/auth");
const genres = require("../routes/genre");
const error = require("../middlewares/error");
const helmet = require("helmet");
const express = require("express");

module.exports = function (app) {
  app.use(helmet());
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
