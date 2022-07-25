const { isValidObjectId } = require("mongoose");
const Class = require("../models/class");
const School = require("../models/school");
const sendError = require("../utils/sendError");
const { SUPERUSER, SCHOOL_ADMIN } = require("../models/user");

exports.getAll = async (req, res) => {
  const user = req.user;
  let { schoolId } = req.body;

  if (user.role === SUPERUSER && !isValidObjectId(schoolId))
    return sendError(res, "Invalid schoolId");
  if (user.role === SCHOOL_ADMIN) schoolId = user.school.toString();

  const classes = await Class.find({ school: schoolId }).select("name").lean();

  return res.json({ classes });
};

exports.create = async (req, res) => {
  const { schoolId, name } = req.body;

  if (!isValidObjectId(schoolId)) return sendError(res, "Invalid schoolId");
  if (!name) return sendError(res, "name is required");

  const school = await School.exists({ _id: schoolId });
  const newClass = new Class({ school: school._id, name });
  try {
    newClass.save();
  } catch (error) {
    return sendError(res, error);
  }

  return res.json({ classId: newClass._id });
};
