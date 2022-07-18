const ClassName = require("../models/class");
const School = require("../models/school");
const { SUPERUSER, SCHOOL_ADMIN } = require("../models/user");

exports.create = async (req, res) => {
  const user = req.user;
  if (user.role !== SUPERUSER && user.role !== SCHOOL_ADMIN)
    return sendError(res, "User does not have permission for the action", 401);

  const { schoolId, name } = req.body;
  const school = await School.exists({ _id: schoolId });
  const newClass = new ClassName({ school: school._id, name });
  try {
    newClass.save();
  } catch (error) {
    return sendError(res, error); //Change this
  }

  return res.json({ classId: newClass._id });
};
