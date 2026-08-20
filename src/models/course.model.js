const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: {
    type: String,
    required: [true, "Course title is required"],
  },
  code: {
    type: String,
    required: [true, "Course code is required"],
    unique: true,
  },
  description: {
    type: String,
  },
  creditUnit: {
    type: Number,
    required: [true, "Credit unit is required"],
    min: [1, "Credit unit must be a positive integer"],
  },
  lecturer: {
    type: String,
    required: [false, "Lecturer name is required"],
  },
});

module.exports = mongoose.model("Course", CourseSchema);
