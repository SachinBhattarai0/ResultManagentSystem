const { SCHOOL_ADMIN, SUPERUSER, TEACHER } = require("../models/user");
const sendError = require("../utils/sendError");
const Marks = require("../models/marks");
const Assignment = require("../models/assignment");

exports.create = async (req, res) => {
  let { assignmentId, marksInfo } = req.body;

  const assignment = await Assignment.findById(assignmentId);

  if (!assignment) return sendError(res, "Invalid assignment id");
  const { school, exam, className, subject } = assignment;

  try {
    marksInfo.forEach(async (markInfo) => {
      const mark = {
        subject,
        theoryMark: markInfo.theoryMark,
        practicalMark: markInfo.practicalMark,
      };
      const markItemInfo = {
        school,
        exam,
        className,
        user: markInfo.studentId,
      };

      const markItem = await Marks.findOne(markItemInfo);

      if (markItem) {
        markItem.marks.push(mark);
        await markItem.save();
      } else {
        const newMark = new Marks({ ...markItemInfo, marks: [mark] });
        await newMark.save();
      }
    });
    assignment.completed = true;
    await assignment.save();
  } catch (error) {
    return sendError(res, error);
  }

  return res.json({ message: "Marks created successfully" });
};
