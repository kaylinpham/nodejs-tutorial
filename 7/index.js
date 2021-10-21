const mongoose = require("mongoose");
const debug = require("debug")("app:debug");

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => debug("Connected to MongoDB..."))
  .catch((err) => {
    debug(err);
  });

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Course = mongoose.model("Course", courseSchema); //class
const Author = mongoose.model("Author", authorSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: false,
  }); //instance

  try {
    // await course.validate();
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.errors);
  }
}

async function createAuthor(name, bio, website) {
  const course = new Course({
    name,
    bio,
    website,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.errors);
  }
}

async function getCourses() {
  //eq (equal)
  //ne (not equal)
  //gt (greater than)
  //gte (greater than or equal to)
  //lt (less than)
  //lte (less than or equal to)
  //in
  //nin (not in)
  //find({price: 10})
  //find({price: {$gte: 10}})
  //find({price: {$gte: 10, $lte: 20}})
  //find({price: {$in: [10, 15, 20]}})

  //or
  //and
  //.find()
  //.or([{author: "Mosh"}, {isPublished: true}])

  //REGEX
  //.find({author: /pattern/i}) // "i" character at the end indicates ignore uppercase, lowercase
  //.find({author: /.*Mosh.*/}) // ".*" indicates 0 or more characters

  //PAGINATION
  const pageNumber = 2;
  const pageSize = 10;
  //api/courses?pageNumber=2&pageSize=10

  const courses = await Course.find();
  //find() with filter Course.find({author: "Mosh", isPublished: true})
  //.skip((pageNumber - 1) * pageSize)
  //.limit(pageSize)
  //.sort({name: 1}) //ascending, -1 is descending
  //.select({name: 1, tags: 1}) //just get name ang tags and _id
  //.count() instead of select() will return the number of result
  console.log(courses);
}

// createCourse();
// getCourses();

async function updateCourseVer1(id) {
  //Approach 1: query first
  //findById()
  //Modify its properties
  //save()
  const course = await Course.findById(id);
  if (!course) return console.log("Not found ID");

  course.isPublished = true;
  course.author = "Another author";
  //   course.set({
  //     isPublished: true,
  //     author: "Another author",
  //   });

  const result = await course.save();
  console.log(result);
}

async function updateCourseVer2(id) {
  //Approach 2: Update first
  //Update directly
  //Optionally: get the updated document
  //   const result = Course.updateMany({ isPublished: false });
  const result = await Course.updateOne(
    { _id: id },
    {
      $set: { author: "Mosh", isPublished: false },
    }
  );

  console.log(result);
  //In case of returning document before update, we use findByIdAndUpdate instead of updateOne,
  //the first argument is id, not {_id: id}
  //If you want to return document AFTER update, we add third argument is {new: true}
}
// updateCourseVer2("5a68fde3f09ad7646ddec17e");

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id }); //.findByIdAndRemove(id) return course
  console.log(result);
}
