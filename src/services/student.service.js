const Student = require("../models/student.model");

const createStudent = async (studentData) => {
  const existingRegNo = await Student.findOne({
    registrationNumber: studentData.registrationNumber,
  });

  if (existingRegNo) {
    throw new Error("Registration number already exists");
  }

  const existingEmail = await Student.findOne({
    email: studentData.email,
  });

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  // TODO: Verify department exists once Department module is implemented
  const student = await Student.create(studentData);

  return student;
};

const getAllStudents = async () => {
  const students = await Student.find(
    {},
    { firstName: 1, lastName: 1, email: 1, _id: 1 },
  );

  return students;
};

const getStudentById = async (studentId) => {
  const student = await Student.findById(studentId);
  if (!student) {
    throw new Error("Student not found");
  }
  return student;
};

const updateStudent = async (studentId, studentData) => {
  const student = await Student.findByIdAndUpdate(studentId, studentData, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!student) {
    throw new Error("Student not found");
  }
  return student;
};

const deleteStudent = async (studentId) => {
  const student = await Student.findByIdAndDelete(studentId);
  if (!student) {
    throw new Error("Student not found");
  }
  return student;
};

module.exports = { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent };
