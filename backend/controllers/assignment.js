const Assignment = require("../models/assignment");
const School = require("../models/school");
const ClassName = require("../models/class");
const Subject = require("../models/subject");
const Student = require("../models/student");
const Exam = require("../models/exam");
const { User, SUPERUSER, SCHOOL_ADMIN, STUDENT } = require("../models/user");
const { TEACHER } = require("../models/user");
const sendError = require("../utils/sendError");
const { isValidObjectId } = require("mongoose");

exports.getAll = async (req, res) => {
  const loggedInUser = req.user;
  const { userId } = req.body;

  if (!isValidObjectId(userId)) return sendError(res, "Invalid id");
  const user = await User.findById(userId);

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
  const { schoolId, examId, classId, subjectId, teacherId } = req.body;

  try {
    //Executes all db operations concurrently
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

    return res.json({ assignmentId: newAssignment._id });
  } catch (error) {
    return sendError(
      res,
      "Either some values are missing or value is duplicate or invalid"
    );
  }
};

exports.assignmentInfo = async (req, res) => {
  const { assignmentId } = req.params;
  const loggedInUser = req.user;

  if (!isValidObjectId(assignmentId))
    return sendError(res, "Invalid assignment id");

  const assignment = await Assignment.findById(assignmentId)
    .populate({ path: "subject", select: "name theoryMark practicalMark" })
    .populate({ path: "className", select: "name" })
    .populate({ path: "exam", select: "year month date" })
    .populate({ path: "to", select: "username" })
    .lean();

  if (
    loggedInUser.role !== SCHOOL_ADMIN &&
    loggedInUser.role !== SUPERUSER &&
    loggedInUser._id !== assignment.to
  )
    return sendError(res, "user not allowed for the action", 401);

  if (
    loggedInUser.role === SCHOOL_ADMIN &&
    loggedInUser.school !== assignment.school
  )
    return sendError(res, "user not allowed for the action!", 401);

  if (!assignment)
    return sendError(res, "Assignment not found with given params");

  const studentList = await Student.find(
    {
      active: true,
      className: assignment.className._id,
      subjects: assignment.subject._id,
    },
    "name rollNo"
  ).lean();

  const assignmentInfo = {
    subject: assignment.subject.name,
    class: assignment.className.name,
    exam: assignment.exam,
    assignedTo: assignment.to,
    theoryMark: assignment.subject.theoryMark,
    practicalMark: assignment.subject.practicalMark,
    studentList,
  };

  return res.json(assignmentInfo);
};
