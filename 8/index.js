// require("dotenv").config();
const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/validation")();
require("./startup/config")();
require("./startup/logging")();
require("./startup/db")();
require("./startup/routes")(app);

const port = process.env.PORT || 8080;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
