const Course = require("../models/course.model");
const Student = require("../models/student.model");
const AppError = require("../utils/app-error");

const createCourse = async (courseData) => {
  const existingCourse = await Course.findOne({
    code: courseData.code,
  });

  if (existingCourse) {
    throw new AppError("Course code already exists", 409);
  }
  const course = await Course.create(courseData);
  return course;
};

const getAllCourses = async () => {
  const courses = await Course.find();
  return courses;
};

const getCourseById = async (courseId) => {
  const course = await Course.findById(courseId);
  if (!course) {
    throw new AppError("Course not found", 404);
  }
  return course;
};

const updateCourse = async (courseId, courseData) => {
  const course = await Course.findByIdAndUpdate(courseId, courseData, {
    returnDocument: after,
    runValidators: true,
  });
  if (!course) {
    throw new AppError("Course not found", 404);
  }
  return course;
};

const deleteCourse = async (courseId) => {
  const course = await Course.findByIdAndDelete(courseId);
  if (!course) {
    throw new AppError("Course not found", 404);
  }
  await Student.updateMany(
    { courses: courseId },
    { $pull: { courses: courseId } },
  );
  return course;
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
