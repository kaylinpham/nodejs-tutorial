const { User, validateUser } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");

async function createNewUser(req, res) {
  const { error } = validateUser(req.body);
  if (error)
    return res
      .status(400)
      .send({ isError: true, message: error.details[0].message });

  let user = await User.find().or([
    { email: req.body.email },
    { phone: req.body.phone },
  ]);
  if (user)
    return res.status(400).send({
      isError: true,
      message: "Email or phone number has been already registered",
    });

  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .status(200)
    .send({
      isError: false,
      user: _.pick(user, ["_id", "name", "email", "phone"]),
      message: "Create successfully",
    });
}

async function getCurrentUser(req, res) {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).send({ isError: false, user });
}

module.exports = { createNewUser, getCurrentUser };
