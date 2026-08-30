const studentController = require("../controllers/student.controller");
const Router = require("express").Router();
const { validate } = require("../middlewares/validate.middleware");
const {
  createStudentSchema,
  updateStudentSchema,
  studentQuerySchema
} = require("../validators/student.validators");

Router.route("/")
  .get(validate(studentQuerySchema, "query"), studentController.getAllStudents)
  .post(validate(createStudentSchema, "body"), studentController.createStudent);

Router.route("/:id")
  .get(studentController.getStudentById)
  .put(validate(updateStudentSchema, "body"), studentController.updateStudent)
  .delete(studentController.deleteStudent);
module.exports = Router;

Router.post(
  "/:studentId/course/:courseId",
  studentController.assignCourseToStudent,
);
Router.get("/:studentId/courses", studentController.getStudentCourses);
