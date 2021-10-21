console.log("Before");
// const user = getUser(150249);
// getUserCallback(150249, (user) => {
//   console.log("User", user);

//   getRepositories(user.githubUsername, (repositories) => {
//     console.log("Repositories", repositories);
//   });
// });
// console.log(user);
console.log("After");

//Callbacks
//Promises
//Async/await

function getUser(id) {
  setTimeout(() => {
    console.log("Loading from user collection...");
    return { id: id, githubUsername: "Giang" };
  }, 1000);
}

//CALLBACK
function getUserCallback(id, callback) {
  setTimeout(() => {
    console.log("Loading from user collection...");
    callback({ id: id, githubUsername: "Giang" });
  }, 1000);
}

//PROMISE
function getUserPromise(id) {
  return new Promise((resolve, reject) => {
    console.log("Loading from user collection...");
    setTimeout(() => {
      const user = { id: id, githubUsername: "Giang" };
      console.log("User", user);
      resolve(user);
    }, 1000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    console.log("Loading from repo collection...");
    setTimeout(() => {
      resolve(["repo1", "repo2", "repo3"]);
    }, 1000);
  });
}

getUserPromise(150249)
  .then((user) => getRepositories(user.githubUsername))
  .then((repos) => console.log("Repositories", repos))
  .catch((err) => console.log("Error", err.message));

//ASYNC AWAIT
async function displayRepos() {
  try {
    const user = await getUserPromise(150249);
    const repos = await getRepositories(user.githubUsername);
    console.log("Repositories", repos);
  } catch (error) {
    console.log(error.message);
  }
}
displayRepos();
