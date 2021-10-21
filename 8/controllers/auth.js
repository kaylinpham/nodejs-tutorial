const { User } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
// const jwt = require("jsonwebtoken");
// const config = require("config");

async function login(req, res) {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ isError: true, message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({
      isError: true,
      message: "Invalid email or password",
    });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({
      isError: true,
      message: "Invalid email or password",
    });

  // const token = jwt.sign(
  //   { ..._.pick(user, ["_id", "name"]) },
  //   process.env.APP_SECRET_KEY
  // );
  // const token = jwt.sign(
  //   { ..._.pick(user, ["_id", "name"]) },
  //   config.get("jwtPrivateKey")
  // );
  const token = user.generateAuthToken();

  res
    .status(200)
    .send({ isError: false, token, message: "Login successfully" });
}

function validate(account) {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(255).required(),
  };

  return Joi.validate(account, schema);
}

module.exports = { login };
