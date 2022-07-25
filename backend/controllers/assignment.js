const Assignment = require("../models/assignment");
const School = require("../models/school");
const ClassName = require("../models/class");
const Subject = require("../models/subject");
const Student = require("../models/student");
const Exam = require("../models/exam");
const { User, SUPERUSER, SCHOOL_ADMIN } = require("../models/user");
const { TEACHER } = require("../models/user");
const sendError = require("../utils/sendError");

exports.getAllUserAssignments = async (req, res) => {
  const user = req.user;

  const assignments = await Assignment.find({ to: user._id, completed: false })
    .populate({ path: "subject", select: "name theoryMark practicalMark" })
    .populate({ path: "className", select: "name" })
    .populate({ path: "exam", select: "year month date" })
    .lean();

  return res.json({ assignments });
};

exports.getAllSchoolAssignments = async (req, res) => {
  const user = req.user;
  let { schoolId } = req.body;

  if (user.role === SUPERUSER && !schoolId)
    return sendError(res, "schoolId must be present");

  if (user.role === SCHOOL_ADMIN) schoolId = user.school.toString();

  const assignments = await Assignment.find({ school: schoolId })
    .populate({ path: "subject", select: "name theoryMark practicalMark" })
    .populate({ path: "className", select: "name" })
    .populate({ path: "to", select: "username" })
    .populate({ path: "exam", select: "year month date" })
    .lean();

  return res.json({ assignments });
};

exports.getCompleted = async (req, res) => {
  const user = req.user;

  const assignments = await Assignment.find({ to: user._id, completed: true })
    .populate({ path: "subject", select: "name" })
    .populate({ path: "className", select: "name" })
    .populate({ path: "exam", select: "year month date" })
    .lean();

  return res.json({ assignments });
};

exports.create = async (req, res) => {
  const user = req.user;
  let { schoolId, examId, classId, subjectId, teacherId } = req.body;

  if (user.role === SUPERUSER && !schoolId)
    return sendError(res, "schoolId must be present");

  if (user.role === SCHOOL_ADMIN) schoolId = user.school.toString();

  try {
    const [school, exam, cls, subject, user] = await Promise.all([
      School.findOne({ _id: schoolId }, "_id").lean(),
      Exam.findOne({ _id: examId }, "_id school").lean(),
      ClassName.findOne({ _id: classId }, "_id school").lean(),
      Subject.findOne({ _id: subjectId }, "_id school").lean(),
      User.findById({ _id: teacherId }, "_id school role").lean(),
    ]);

    if (
      user.role !== TEACHER ||
      school._id.toString() !== cls.school.toString() ||
      school._id.toString() !== subject.school.toString() ||
      school._id.toString() !== user.school.toString() ||
      school._id.toString() !== exam.school.toString()
    )
      return sendError(res, "Bad datas given");

    const newAssignment = new Assignment({
      className: cls._id,
      exam: exam._id,
      to: user._id,
      school: school._id,
      subject: subject._id,
    });
    await newAssignment.save();

    return res.json({
      assignmentId: newAssignment._id,
      message: "Assignment created Successfully",
    });
  } catch (error) {
    return sendError(
      res,
      "Either some values are missing or value is duplicate or invalid"
    );
  }
};

exports.studentList = async (req, res) => {
  const { assignmentId } = req.body;
  const loggedInUser = req.user;

  const assignment = await Assignment.findById(assignmentId).lean();
  if (!assignment) return sendError(res, "Invalid assignment id");

  if (loggedInUser._id.toString() !== assignment.to.toString())
    return sendError(res, "User not allowed for action", 401);

  const studentList = await Student.find(
    {
      active: true,
      className: assignment.className,
      subjects: assignment.subject,
    },
    "name rollNo"
  )
    .sort("rollNo")
    .lean();

  return res.json({ studentList });
};
