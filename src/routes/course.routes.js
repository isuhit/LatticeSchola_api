const courseController = require("../controllers/course.controller");
const express = require("express");
const Router = express.Router();
const { validate } = require("../middlewares/validate.middleware");
const { createCourseSchema, updateCourseSchema } = require("../validators/course.validators");

Router.route("/")
  .get(courseController.getAllCourses)
  .post(validate(createCourseSchema), courseController.createCourse);

Router.route("/:id")
  .get(courseController.getCourseById)
  .patch(validate(updateCourseSchema), courseController.updateCourse)
  .delete(courseController.deleteCourse);


module.exports = Router;
