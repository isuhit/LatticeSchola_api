const express = require("express");
const app = express();

app.use(express.json());

const studentRoutes = require("./routes/student.routes");
app.use("/api/students", studentRoutes);

module.exports = app;
