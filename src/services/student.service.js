const Student = require("../models/student.model");
const Course = require("../models/course.model");
const AppError = require("../utils/app-error");

const createStudent = async (studentData) => {
  const existingRegNo = await Student.findOne({
    registrationNumber: studentData.registrationNumber,
  });

  if (existingRegNo) {
    throw new AppError("Registration number already exists", 409);
  }

  const existingEmail = await Student.findOne({
    email: studentData.email,
  });

  if (existingEmail) {
    throw new AppError("Email already exists", 409);
  }

  // TODO: Verify department exists once Department module is implemented
  const student = await Student.create(studentData);

  return student;
};

const getAllStudents = async (validQuery) => {
  const { level, status, gender, page, limit, sort } = validQuery;
  const skip = (page - 1) * limit;
  const filter = {};

  if (level) {
    filter.level = level;
  }
  if (status) {
    filter.status = status;
  }
  if (gender) {
    filter.gender = gender;
  }
  const totalStudent = await Student.countDocuments(filter);
  const pages = Math.ceil(totalStudent / limit);
  const students = await Student.find(filter, "firstName lastName email level")
    .sort(`${sort} _id`)
    .skip(skip)
    .limit(limit)
    .lean();

  return {
    page,
    pages,
    limit,
    size: students.length,
    students,
    total: totalStudent,
  };
};

const getStudentById = async (studentId) => {
  const student = await Student.findById(studentId);
  if (!student) {
    throw new AppError("Student not found", 404);
  }
  return student;
};

const updateStudent = async (studentId, studentData) => {
  const student = await Student.findByIdAndUpdate(studentId, studentData, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!student) {
    throw new AppError("Student not found", 404);
  }
  return student;
};

const deleteStudent = async (studentId) => {
  const student = await Student.findByIdAndDelete(studentId);
  if (!student) {
    throw new AppError("Student not found", 404);
  }
  return student;
};

const assignCourseToStudent = async (studentId, courseId) => {
  const student = await Student.findById(studentId);
  const course = await Course.findById(courseId);

  //Ensure student exists
  if (!student) {
    throw new AppError("Student does not exist", 404);
  }
  //Ensure Course exists
  if (!course) {
    throw new AppError("Course does not exist", 404);
  }

  // Ensure Course is not already assigned
  const courseAssigned = student.courses.some((courseId) =>
    courseId.equals(course._id),
  );
  if (courseAssigned) {
    throw new AppError("Course already exists for this student", 409);
  }

  student.courses.push(course._id);
  await student.save();
  return student;
};

const getStudentCourses = async (studentId) => {
  const student = await Student.findById(studentId);
  if (!student) {
    throw new AppError("Student does not exist", 404);
  }
  await student.populate("courses");

  return student;
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  assignCourseToStudent,
  getStudentCourses,
};
