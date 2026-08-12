const { createStudentSchema } = require("../validators/student.validators");
const AppError = require("../utils/app-error");


const validate =(schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");

    const validationError = new AppError(errorMessage, 400);
    return next(validationError);
  }
  req.body = value;
  next();
};

module.exports = {
  validate,
};
