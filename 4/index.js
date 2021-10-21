// const startupDebugger = require("debug")("app:startup");
// const dbDebugger = require("debug")("app:db");
const debug = require("debug")("app:debug");
const config = require("config");
const Joi = require("joi");
const logger = require("./middlewares/logger");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const courses = require("./routes/courses");
const home = require("./routes/home");
const app = express();

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get("env")}`);

// Khỏi dùng đi, backend thì cần j ngựa ngựa, pug mệt vl
// app.set("view engine", "pug"); // compulsory
// app.set("views", "./views"); //optional, path where we store the template

app.use(express.json());
app.use(express.static("public")); //with this, we can localhost:8080/readme.txt to read its content
app.use(helmet());

// console.log(`Application name: ${config.get("name")}`);
// console.log(`Mail: ${config.get("mail.host")}`);
// console.log(`Password: ${config.get("mail.password")}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny")); //use to log HTTP request details to console
  //   console.log("Morgan enabled...");
  //   startupDebugger("Morgan enabled...");
  debug("Morgan enabled...");
}

//DB work
debug("Connected to the database...");

app.use(logger);

app.use(function (req, res, next) {
  console.log("Authenticating...");
  next();
});

app.use("/api/courses", courses);
app.use("/", home);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
