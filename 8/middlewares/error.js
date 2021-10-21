const winston = require("winston");

function error(err, req, res, next) {
  winston.log("error", err.message); //winston.error(err.message)
  //error
  //warn
  //info
  //verbose
  //debug
  //silly

  res.status(500).send({ isError: true, message: "Something failed" });
}

module.exports = error;
