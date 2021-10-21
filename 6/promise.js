const p = new Promise((resolve, reject) => {
  //Kick off some async work...
  //...
  setTimeout(() => {
    resolve(1);
  }, 1000);
  //reject(new Error('message'))
});

p.then((result) => console.log(result)).catch((err) =>
  console.log(err.message)
);
