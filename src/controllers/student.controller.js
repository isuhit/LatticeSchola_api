const studentService = require("../services/student.service");

const createStudent = async (req, res) => {
  try {
    const studentData = req.body;
    const student = await studentService.createStudent(studentData);
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json({
      success: true,
      message: "Students retrieved successfully",
      data: students,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await studentService.getStudentById(studentId);
    res
      .status(200)
      .json({
        success: true,
        message: "Student retrieved successfully",
        data: student,
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const studentData = req.body;
    const student = await studentService.updateStudent(studentId, studentData);

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await studentService.deleteStudent(studentId);

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: student,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  createStudent,
  getStudentById,
  getAllStudents,
  updateStudent,
  deleteStudent,
};
