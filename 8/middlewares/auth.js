const jwt = require("jsonwebtoken");
const config = require("config");

function authorization(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .send({ isError: true, message: "Access denied. No token provided" });

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (exception) {
    return res.status(400).send({ isError: true, message: "Invalid token" });
  }
}

module.exports = authorization;
