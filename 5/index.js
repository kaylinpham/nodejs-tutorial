const express = require("express");
const app = express();
const helmet = require("helmet");

const router = require("./routes/courses");
const home = require("./routes/home");

app.use(express.json());
app.use(helmet());

app.use("/", home);
app.use("/api/courses", router);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
