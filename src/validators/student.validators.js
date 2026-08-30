const joi = require("joi");

const createStudentSchema = joi.object({
  registrationNumber: joi.string().trim().required(),
  firstName: joi.string().trim().min(2).max(50).required(),
  lastName: joi.string().trim().min(2).max(50).required(),
  email: joi.string().email().lowercase().trim().required(),
  phone: joi
    .string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .required(),
  gender: joi.string().valid("Male", "Female").required(),
  level: joi.number().valid(100, 200, 300, 400).required(),
  status: joi.string().valid("Registered", "Pending").default("Pending"),
});

const updateStudentSchema = joi.object({
  registrationNumber: joi.string().trim(),
  firstName: joi.string().trim().min(2).max(50),
  lastName: joi.string().trim().min(2).max(50),
  email: joi.string().email().lowercase().trim(),
  phone: joi.string().pattern(/^\+?[1-9]\d{1,14}$/),
  gender: joi.string().valid("Male", "Female"),
  level: joi.number().valid(100, 200, 300, 400),
  status: joi.string().valid("Registered", "Pending"),
}).unknown(false);

const studentQuerySchema = joi.object({
  //filtering
  gender: joi.string().trim().valid("Male", "Female"),
  status: joi.string().valid("Registered", "Pending"),
  level: joi.number().valid(100, 200, 300, 400),

  //Pagination
  limit: joi.number().integer().min(1).max(100).default(20),
  page: joi.number().integer().min(1).default(1),
  sort: joi.string().valid("firstName", "-createdAt").default("-createdAt")
}).unknown(false)

module.exports = {
  createStudentSchema,
  updateStudentSchema,
  studentQuerySchema
};
