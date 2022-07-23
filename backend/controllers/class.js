const { isValidObjectId } = require("mongoose");
const ClassName = require("../models/class");
const School = require("../models/school");
const sendError = require("../utils/sendError");

exports.create = async (req, res) => {
  const { schoolId, name } = req.body;

  if (!isValidObjectId(schoolId)) return sendError(res, "Invalid schoolId");
  if (!name) return sendError(res, "name is required");

  const school = await School.exists({ _id: schoolId });
  const newClass = new ClassName({ school: school._id, name });
  try {
    newClass.save();
  } catch (error) {
    return sendError(res, error);
  }

  return res.json({ classId: newClass._id });
};
