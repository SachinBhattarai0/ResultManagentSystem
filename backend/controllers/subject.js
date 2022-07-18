const Subject = require("../models/subject");
const School = require("../models/school");
const { isValidObjectId } = require("mongoose");

exports.create = async (req, res) => {
  const { schoolId, name, fullMark, passMark } = req.body;

  if (!isValidObjectId(schoolId)) return sendError(res, "Invalid schoolId");

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
