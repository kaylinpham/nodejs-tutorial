// const p = Promise.resolve(150249);
// p.then((res) => console.log(res));

// const p1 = Promise.reject(new Error("Reason for the error"));
// p1.catch((error) => console.log(error));

//PARALLEL PROMISES
const facebook = new Promise((resolve) => {
  console.log("Calling Facebook API...");
  setTimeout(() => {
    resolve("Facebook");
  }, 1000);
});

const twitter = new Promise((resolve) => {
  console.log("Calling Twitter API...");
  setTimeout(() => {
    resolve("Twitter");
  }, 1000);
});

const tiktok = new Promise((resolve, reject) => {
  console.log("Calling Tiktok API...");
  setTimeout(() => {
    reject(new Error("Tiktok failed"));
  }, 1000);
});

Promise.all([facebook, twitter, tiktok])
  .then((data) => console.log(data))
  .catch((err) => console.log(err.message));
//Any promises in Promise.all reject, it is considered reject too.

Promise.race([tiktok, twitter, facebook])
  .then((data) => console.log(data))
  .catch((err) => console.log(err.message));
//Any promises in Promise.race resolve, it is considered resolve too. The result is the first fullfilled promise.
