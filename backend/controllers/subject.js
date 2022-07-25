const Subject = require("../models/subject");
const School = require("../models/school");
const { isValidObjectId } = require("mongoose");
const { SUPERUSER, SCHOOL_ADMIN } = require("../models/user");
const Class = require("../models/class");
const sendError = require("../utils/sendError");

exports.getAll = async (req, res) => {
  const user = req.user;
  let { schoolId, classId } = req.body;

  if (user.role === SUPERUSER && !isValidObjectId(schoolId))
    return sendError(res, "Invalid schoolId");
  if (user.role === SCHOOL_ADMIN) schoolId = user.school.toString();
  if (!classId) return sendError(res, "Invalid classId");

  const subjects = await Subject.find({ school: schoolId, className: classId })
    .select("name")
    .lean();

  return res.json({ subjects });
};

exports.create = async (req, res) => {
  const { schoolId, name, theoryMark, practicalMark, passMark, classes } =
    req.body;

  if (!isValidObjectId(schoolId)) return sendError(res, "Invalid schoolId");
  if (!classes[0]) return sendError(res, "classes is required");

  //Be aware of //
  const invalidClassId = classes.filter((classId) => !isValidObjectId(classId));
  if (invalidClassId.length !== 0) return sendError(res, "classId is invalid");

  const school = await School.exists({ _id: schoolId });
  if (!school) sendError(res, "School does not exist");

  const newSubject = new Subject({
    school: school._id,
    name,
    theoryMark,
    practicalMark,
    passMark,
    className: classes,
  });

  try {
    await newSubject.save();
  } catch (error) {
    return sendError(res, error);
  }

  return res.json({ subjectId: newSubject._id });
};
