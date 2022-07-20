const {
  User,
  DEFAULT_ROLE,
  SUPERUSER,
  TEACHER,
  STUDENT,
  SCHOOL_ADMIN,
} = require("../models/user");
const sendError = require("../utils/sendError");
const jwt = require("jsonwebtoken");
const School = require("../models/school");
require("dotenv").config();

exports.createUser = async (req, res) => {
  const user = req.user

  const { username, password, schoolId, role } = req.body;

  if (role !== TEACHER && role !== STUDENT)
    return sendError(res, "Invalid role provided");

  let school;
  if (schoolId) school = await School.findOne({ _id: schoolId }).lean();

  if (!school && user.role !== SCHOOL_ADMIN ) return sendError(res, "School doesnot exist");

  const newUser = new User({
    username,
    password,
    school: user.school || school._id, 
    role: role,
  });

  try {
    await newUser.save();
  } catch (error) {
    return sendError(res, error);
  }

  return res
    .status(201)
    .json({ message: "User creted Successfully", userId: newUser._id });
};

exports.createAdmin = async (req, res) => {
  const { username, password, schoolId } = req.body;

  const school = await School.findOne({ _id: schoolId });
  if (!school) return sendError(res, "Invalid school Id");

  const newAdmin = new User({
    username,
    password,
    school: school._id,
    role: SCHOOL_ADMIN,
  });

  try {
    await newAdmin.save();
  } catch (error) {
    return sendError(res, error);
  }

  return res.status(201).json("School admin created successfully");
};

exports.signIn = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return sendError(res, "Invalid username", 401);

  const isMatched = await user.comparePassword(password);
  if (!isMatched) return sendError(res, "Invalid password", 401);

  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  return res.json({ jwtToken });
};
