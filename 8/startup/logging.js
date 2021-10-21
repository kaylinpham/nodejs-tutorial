const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  //Hanle uncaught exception (approach 1)
  // process.on("uncaughtException", (ex) => {
  //   // console.log("WE HAVE AN UNCAUGHT EXCEPTION");
  //   winston.error(ex.message, ex);
  //   process.exit(1);
  // });

  //Hanle uncaught exception (approach 2)
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  //Hanle unhandled rejection
  process.on("unhandledRejection", (ex) => {
    // winston.error(ex.message, ex);
    // process.exit(1);

    //Because winston.handleExceptions does not work with unhandled rejection, so you can trick by throw exception here
    throw ex;
  });

  // throw new Error("Lỗi cho vui");
  // const p = Promise.reject(new Error("Errors for fun"));
  // p.then(() => console.log("Done"));

  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  // winston.add(new winston.transports.File({ filename: "logfile.log", level:'info' }));
  winston.add(
    new winston.transports.MongoDB({ db: "mongodb://localhost/vidly" })
  );
};
