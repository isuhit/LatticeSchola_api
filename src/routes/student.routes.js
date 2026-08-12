const studentController = require("../controllers/student.controller");
const Router = require("express").Router();
const { validate } = require("../middlewares/validate.middleware");
const { createStudentSchema, updateStudentSchema } = require("../validators/student.validators");

Router.route("/")
  .get(studentController.getAllStudents)
  .post(validate(createStudentSchema), studentController.createStudent);

Router.route("/:id")
  .get(studentController.getStudentById)
  .put(validate(updateStudentSchema), studentController.updateStudent)
  .delete(studentController.deleteStudent);
module.exports = Router;
