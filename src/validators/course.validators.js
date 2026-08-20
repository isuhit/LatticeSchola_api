const joi = require("joi");

const createCourseSchema = joi.object({
  title: joi.string().trim().min(2).max(100).required(),
  code: joi
    .string()
    .trim()
    .pattern(/^[A-Z]{2,4}\d{3}$/)
    .required(),
  description: joi.string().trim().max(200),
  creditUnit: joi.number().integer().positive().min(1).required(),
  lecturer: joi.string().trim().max(100),
});

const updateCourseSchema = joi.object({
  title: joi.string().trim().min(2).max(100),
  code: joi
    .string()
    .trim()
    .pattern(/^[A-Z]{2,4}\d{3}$/),
  description: joi.string().trim().max(200),
  creditUnit: joi.number().integer().positive().min(1),
  lecturer: joi.string().trim().max(100),
});

module.exports = {
  createCourseSchema,
  updateCourseSchema,
};
