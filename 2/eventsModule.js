const EventEmitter = require("events"); // EventEmitter is class
// const emitter = new EventEmitter(); // emitter is an instance of EventEmitter class

//Register a listener
// emitter.on("messageLogged", function (args) {
//   console.log("Listener called ", args);
// });

//Make a noisy, produce, raise events
// emitter.emit("messageLogged", { id: 1, url: "http://" });

//THE ORDER IS IMPORTANT
// if we change the order of emit and on, nothing happens, because it works sync

const Logger = require("../logger");
const logger = new Logger();
logger.on("messageLogged", function (args) {
  console.log("Listener called ", args);
});
logger.log("Hehe");
