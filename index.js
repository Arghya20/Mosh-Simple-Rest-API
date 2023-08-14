const Joi = require("joi");
const express = require("express");
const app = express();
const courses = require("./routes/courses");
const home = require("./routes/home");

app.use(express.json());

app.use("/api/courses", courses);
app.use("/", home);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is lessing on ${port}`);
});

//commited by arghya
