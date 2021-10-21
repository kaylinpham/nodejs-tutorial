function sayHello(name) {
  console.log("Hello " + name);
}

sayHello("Giang");
//in node we don't have window or document object
//but we have "global" object but it cannot access variables and functions

var message = "";
console.log(global.message); //undefined
// console.log(window.message); //"" but in here "window" is not defined

console.log(module); //"module" object appears like global but not global
