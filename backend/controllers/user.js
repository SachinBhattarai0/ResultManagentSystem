const { User, TEACHER, SCHOOL_ADMIN } = require("../models/user");
const sendError = require("../utils/sendError");
const jwt = require("jsonwebtoken");
const School = require("../models/school");
const Student = require("../models/student");
const Class = require("../models/class");
const Subject = require("../models/subject");
const { isValidObjectId } = require("mongoose");
require("dotenv").config();

exports.createTeacher = async (req, res) => {
  const user = req.user;
  let { username, password, schoolId } = req.body;
  if (user.role === SCHOOL_ADMIN) schoolId = user.school.toString();

  const school = await School.findOne({ _id: schoolId }).lean();

  if (!school && user.role !== SCHOOL_ADMIN)
    return sendError(res, "Invalid school Id");

  const newTeacher = new User({
    username,
    password,
    school: school._id,
  });

  try {
    await newTeacher.save();
  } catch (error) {
    return sendError(res, error);
  }

  return res
    .status(201)
    .json({ message: "User creted Successfully", userId: newTeacher._id });
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

exports.createStudent = async (req, res) => {
  const user = req.user;
  let { name, schoolId, classId, rollNo, subjects } = req.body;
  if (user.role === SCHOOL_ADMIN) schoolId = user.school.toString();

  const [school, _class] = await Promise.all([
    School.findById(schoolId),
    Class.findById(classId),
  ]);

  if (!school || !_class) return sendError(res, "Invalid school Id");
  if (school._id.toString() !== _class.school.toString())
    return sendError(res, "Bad request");

  const subjects_arr = await subjects.map((subjectId) =>
    isValidObjectId(subjectId)
  );
  if (subjects_arr.includes(false)) return sendError(res, "Invalid subject id");

  const newStudent = new Student({
    name,
    school: school._id,
    className: _class._id,
    rollNo,
    subjects: subjects,
  });

  try {
    await newStudent.save();
  } catch (error) {
    return sendError(res, error);
  }

  return res.status(201).json("Student created successfully");
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
