const studentController = require("../controllers/student.controller");
const Router = require("express").Router();

Router.route("/")
  .get(studentController.getAllStudents)
  .post(studentController.createStudent);

Router.route("/:id")
  .get(studentController.getStudentById)
  .put(studentController.updateStudent)
  .delete(studentController.deleteStudent);
module.exports = Router;
