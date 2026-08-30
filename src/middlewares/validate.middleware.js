const AppError = require("../utils/app-error");

const validate = (schema, property) => (req, res, next) => {
  const { error, value } = schema.validate(req[property], {
    abortEarly: false,
    convert: true,
  });
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");

    const validationError = new AppError(errorMessage, 400);
    return next(validationError);
  }
  if (property === "query") {
    req.validQuery = value;
  } else {
    req[property] = value;
  }

  next();
};

module.exports = {
  validate,
};
