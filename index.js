const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.PORT || 4000;

const courses = [
  {
    id: 1,
    name: "course-1",
  },
  {
    id: 2,
    name: "course-2",
  },
  {
    id: 3,
    name: "course-3",
  },
];

// -----------------------------Get Method ---------------------
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((data) => data.id === parseInt(req.params.id));
  if (!course) res.status(404).send("The Course Your find its not available!");
  res.send(course);
});

// -----------------------------------------post method----------------------------------

app.post("/api/courses", (req, res) => {
  //   const schema = {
  //     name: Joi.string().min(3).required(),
  //   };
  //   const result = Joi.validate(req.body, schema);
  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send("Name is required and should be minimum 3 character");
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// -----------------------------------------put method-------------------------------------

app.put("/api/courses/:id", (req, res) => {
  // Validate id/params
  const course = courses.find((data) => data.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("The Course with the given id was not found!");
  }

  //validate the name
  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send("Name is required and should be minimum 3 character");
    return;
  }

  course.name = req.body.name;
  res.send(course);
});

// -------------------------------------delete method-------------------------------------

app.delete("/api/courses/:id", (req, res) => {
  // Validate id/params
  const course = courses.find((data) => data.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The Course with the given id was not found!");
    return;
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

app.listen(port, () => {
  console.log(`server is lessing on ${port}`);
});
