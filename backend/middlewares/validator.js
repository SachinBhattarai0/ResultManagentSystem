const { check, validationResult } = require("express-validator");
const { User, SUPERUSER, SCHOOL_ADMIN, TEACHER } = require("../models/user");
const jwt = require("jsonwebtoken");
const sendError = require("../utils/sendError");
const { isValidObjectId } = require("mongoose");
require("dotenv").config();

exports.validate = (req, res, next) => {
  const errors = validationResult(req).array();
  if (errors[0])
    return sendError(res, `${errors[0].msg} for param ${errors[0].param}`);
  next();
};

exports.schoolValidator = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("School name cannot be empty"),
];

exports.userInfoValidator = [
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
];

exports.signInInfoValidator = [
  check("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Username cannot be empty"),
  check("password").not().isEmpty().withMessage("Password should be present"),
];

exports.OnlySuperUserOrSchoolAdmin = (req, res, next) => {
  const user = req.user;
  if (user.role !== SUPERUSER && user.role !== SCHOOL_ADMIN)
    return sendError(res, "User does not have permission for the action", 401);
  next();
};

exports.OnlySuperUser = (req, res, next) => {
  const user = req.user;
  if (user.role !== SUPERUSER)
    return sendError(res, "User does not have permission for the action", 401);
  next();
};

exports.OnlyTeacher = (req, res, next) => {
  const user = req.user;
  if (user.role !== TEACHER)
    return sendError(res, "User does not have permission for the action", 401);
  next();
};

//This middleware checks for jwtToken in req.body and if it is
//valid then user can be find in req.user in next middleware
exports.authenticateUser = async (req, res, next) => {
  const jwtToken = req.headers.authorization?.split(" ")[1];

  if (!jwtToken) return sendError(res, "Unauthenticated user");
  let decodedToken;
  try {
    decodedToken = jwt.decode(jwtToken, process.env.JWT_SECRET);
  } catch (error) {
    return sendError(
      res,
      "Error while decoding token maybe due to invalid token provided",
      401
    );
  }
  if (!decodedToken) return sendError(res, "Token is invalid");

  const { userId } = decodedToken;
  if (!isValidObjectId(userId)) return sendError(res, "Invalid token");

  const user = await User.findById(userId);

  if (!user) return sendError(res, "Invalid token");

  req.user = user;
  next();
};
