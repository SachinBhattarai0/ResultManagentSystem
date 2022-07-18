const Subject = require("../models/subject");
const School = require("../models/school");
const { SUPERUSER, SCHOOL_ADMIN } = require("../models/user");

exports.create = async (req, res) => {
  const user = req.user;
  if (user.role !== SUPERUSER && user.role !== SCHOOL_ADMIN)
    return sendError(res, "User does not have permission for the action", 401);

  const { schoolId, name, fullMark, passMark } = req.body;

  const school = await School.exists({ _id: schoolId });
  if (!school) sendError(res, "School does not exist");

  const newSubject = new Subject({
    school: school._id,
    name,
    fullMark,
    passMark,
  });

  try {
    await newSubject.save();
  } catch (error) {
    return sendError(res, error); //Change this
  }

  return res.json({ subjectId: newSubject._id });
};
