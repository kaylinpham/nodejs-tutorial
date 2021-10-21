const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/exercise-14", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.error("Failed to connect database!"));

const courseSchema = mongoose.Schema({
  // tags: {
  //   type: Array,
  //   validate: {
  //     validator: function (v) {
  //       return v && v.length > 0;
  //     },
  //     message: "A course should have at least one tag.",
  //   },
  // },
  //EXAMPLE WITH ASYNC CUSTOM VALIDATOR
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 500);
      },
      message: "A course should have at least one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    // match: /pattern/,
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    lowercase: true, //auto convert value to lowercase(or uppercase)
    trim: true, //auto trim string value
  },
  author: String,
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 5,
    max: 200,
    // get: (v) => Math.round(v),
    // set: (v) => Math.round(v),
  },
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses14() {
  return await Course.find({
    isPublished: true,
    tags: "backend",
  })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}
// getCourses14().then((courses) => console.log(courses));

async function getCourses15() {
  return await Course.find({
    isPublished: true,
    tags: { $in: ["backend", "frontend"] },
  })
    .sort("-price")
    .select("name author");
}
// getCourses15().then((courses) => console.log(courses));

async function getCourses16() {
  return await Course.find({ isPublished: true })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .sort("-price")
    .select("name price");
}
getCourses16().then((courses) => console.log(courses));
