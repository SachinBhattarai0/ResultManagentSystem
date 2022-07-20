const Assignment = require("../models/assignment");
const School = require("../models/school");
const ClassName = require("../models/class");
const Subject = require("../models/subject");
const { User, SUPERUSER, SCHOOL_ADMIN } = require("../models/user");
const { TEACHER } = require("../models/user");
const sendError = require("../utils/sendError");
const { isValidObjectId } = require("mongoose");

exports.getAll = async (req, res) => {
  const loggedInUser = req.user;
  const { assignmentOf } = req.body;

  if (!isValidObjectId(assignmentOf)) return sendError(res, "Invalid id");
  const user = await User.findById(assignmentOf);

  if (
    loggedInUser.role !== SCHOOL_ADMIN &&
    loggedInUser.role !== SUPERUSER &&
    loggedInUser._id !== user._id
  )
    return sendError(res, "user not allowed for the action", 401);

  if (loggedInUser.role === SCHOOL_ADMIN && loggedInUser.school !== user.school)
    return sendError(res, "user not allowed for the action!", 401);

  const assignments = await Assignment.find({ to: user._id }).lean();

  return res.json({ assignments });
};

exports.create = async (req, res) => {
  const { schoolId, classId, subjectId, teacherId } = req.body;

  try {
    //Executes all db operations concurrently
    const [school, cls, subject, user] = await Promise.all([
      School.findOne({ _id: schoolId }, "_id").lean(),
      ClassName.findOne({ _id: classId }, "_id school").lean(),
      Subject.findOne({ _id: subjectId }, "_id school").lean(),
      User.findById({ _id: teacherId }, "_id school role").lean(),
    ]);
    if (
      user.role !== TEACHER ||
      school._id.toString() !== cls.school.toString() ||
      school._id.toString() !== subject.school.toString() ||
      school._id.toString() !== user.school.toString()
    )
      return sendError(res, "Bad datas given");

    const newAssignment = new Assignment({
      className: cls._id,
      to: user._id,
      school: school._id,
      subject: subject._id,
    });
    await newAssignment.save();

    return res.json({ assignmentId: newAssignment._id });
  } catch (error) {
    return sendError(res, error);
  }
};
