function admin(req, res, next) {
  //401 Unauthorized: verify token
  //403 Forbidden: have token but no right

  if (!req.user.isAdmin)
    return res.status(403).send({ isError: true, message: "Access denied." });

  next();
}
module.exports = admin;
