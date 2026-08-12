const studentService = require("../services/student.service");
const asyncHandler = require("../utils/async-handler");

const createStudent = asyncHandler(async (req, res) => {
  const studentData = req.body;
  const student = await studentService.createStudent(studentData);
  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: student,
  });
});

const getAllStudents = asyncHandler(async (req, res) => {
  const students = await studentService.getAllStudents();
  res.status(200).json({
    success: true,
    message: "Students retrieved successfully",
    data: students,
  });
});

const getStudentById = asyncHandler(async (req, res) => {
  const studentId = req.params.id;
  const student = await studentService.getStudentById(studentId);
  res.status(200).json({
    success: true,
    message: "Student retrieved successfully",
    data: student,
  });
});

const updateStudent = asyncHandler(async (req, res) => {
  const studentId = req.params.id;
  const studentData = req.body;
  const student = await studentService.updateStudent(studentId, studentData);

  return res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: student,
  });
});

const deleteStudent =asyncHandler( async (req, res) => {
  
    const studentId = req.params.id;
    const student = await studentService.deleteStudent(studentId);

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: student,
    });
});

module.exports = {
  createStudent,
  getStudentById,
  getAllStudents,
  updateStudent,
  deleteStudent,
};
