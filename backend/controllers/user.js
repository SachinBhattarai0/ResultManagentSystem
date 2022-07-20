const { User, DEFAULT_ROLE, SUPERUSER } = require("../models/user");
const sendError = require("../utils/sendError");
const jwt = require("jsonwebtoken");
const School = require("../models/school");
require("dotenv").config();

exports.createUser = async (req, res) => {
  const { username, password, schoolId, role } = req.body;

  if (!schoolId && role !== SUPERUSER)
    return sendError(res, "School must be present");

  const school = await School.findOne({ _id: schoolId }).lean();

  if (role !== SUPERUSER && !school)
    return sendError(res, "School doesnot exist");

  const newUser = new User({
    username,
    password,
    school: school?._id,
    role: role || DEFAULT_ROLE,
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

exports.signIn = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return sendError(res, "Invalid username", 401);

  const isMatched = await user.comparePassword(password);
  if (!isMatched) return sendError(res, "Invalid password", 401);

  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  return res.json({ jwtToken });
};
