const asyncHandler = require("../utils/async-handler");
const courseService = require("../services/course.service");

const createCourse = asyncHandler(async (req, res) => {
  const courseData = req.body;
  const course = await courseService.createCourse(courseData);
  res.status(201).json({
    success: true,
    message: "Course created successfully",
    data: course,
  });
});


const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await courseService.getAllCourses();
  res.status(200).json({
    success: true,
    message: "Courses fetched successfully",
    data: courses,
  });
});

const getCourseById = asyncHandler(async (req, res) => {
  const courseId = req.params.id;
  const course = await courseService.getCourseById(courseId);
  res.status(200).json({
    success: true,
    message: "Course fetched successfully",
    data: course,
  });
});

const updateCourse = asyncHandler(async (req, res) => {
  const courseId = req.params.id;
  const courseData = req.body;

  const course = await courseService.updateCourse(courseId, courseData);
  res.status(200).json({
    success: true,
    message: "Course updated successfully",
    data: course,
  });
});

const deleteCourse = asyncHandler(async (req, res) => {
  const courseId = req.params.id;
  const course = await courseService.deleteCourse(courseId);
  res.status(200).json({
    success: true,
    message: "Course deleted successfully",
    data: course,
  });
});


module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};

