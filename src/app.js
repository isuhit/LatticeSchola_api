const express = require("express");
const app = express();

const {handleError} = require("./middlewares/error.middleware");

app.use(express.json());

const studentRoutes = require("./routes/student.routes");
const courseRoutes = require("./routes/course.routes");


app.use("/api/courses", courseRoutes);
app.use("/api/students", studentRoutes);

app.use(handleError);

module.exports = app;
