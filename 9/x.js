//Trade off between query performance and consistency

//Using references (Normalization) -> CONSISTENCY
let author = {
  name: "Mosh",
};

let course = {
  author: "id",
};

//Using embedded documents (Denormalization) -> PERFORMANCE
let course = {
  author: {
    name: "Mosh",
  },
};

//Hybrid
let author = {
  name: "Mosh",
  //50 other properties
};

let course = {
  author: {
    id: "ref",
    name: "Mosh",
  },
};
