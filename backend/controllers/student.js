const Assignment = require("../models/assignment");
const Student = require("../models/student");
const sendError = require("../utils/sendError");
const Mark = require("../models/marks");

exports.getStudentForAssignment = async (req, res) => {
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

exports.getStudentByExamAndClass = async (req, res) => {
  const { examId, classId } = req.body;

  if (!examId || !classId)
    return sendError(res, "examId and classId are required");

  const mark = await Mark.exists({ className: classId, subjects: examId });
  if (!mark) return res.json({ studentList: [] });

  const studentList = await Student.find({ className: classId }, "name rollNo")
    .sort("rollNo")
    .lean();

  return res.json({ studentList });
};
