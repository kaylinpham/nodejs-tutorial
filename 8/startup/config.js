const config = require("config");

module.exports = function () {
  // if (!process.env.APP_SECRET_KEY) {
  //   console.error("FATAL ERROR: jwtPrivateKey(APP_SECRET_KEY) is not defined.");
  //   process.exit(1);
  // }

  //   if (!config.get("jwtPrivateKey")) {
  //     console.error("FATAL ERROR: jwtPrivateKey(APP_SECRET_KEY) is not defined.");
  //     process.exit(1);
  //   }

  if (!config.get("jwtPrivateKey")) {
    throw new Error(
      "FATAL ERROR: jwtPrivateKey(APP_SECRET_KEY) is not defined."
    );
  }
};
