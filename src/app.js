const express = require("express");
const app = express();

const {handleError} = require("./middlewares/error.middleware");

app.use(express.json());
app.use(handleError);

const studentRoutes = require("./routes/student.routes");
app.use("/api/students", studentRoutes);
app.use(handleError);
module.exports = app;
