const { check, validationResult } = require("express-validator");
const { USER_ROLES } = require("../models/user");
const sendError = require("../utils/sendError");

exports.validate = (req, res, next) => {
  const errors = validationResult(req).array();
  if (errors[0]) return sendError(res, errors[0].msg);
  next();
};

exports.schoolValidator = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("School name cannot be empty"),
];

exports.userValidator = [
  check("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Username cannot be empty"),
  check("password")
    .not()
    .isEmpty()
    .isLength({ min: 8, max: 20 })
    .withMessage(
      "Password should be at least 8 character and max 20 character long"
    ),
  check("role")
    .trim()
    .not()
    .isEmpty(["role"])
    .isIn(USER_ROLES)
    .withMessage(`roles must be one from ${USER_ROLES}`),
];
