const { isValidObjectId } = require("mongoose");
const Exam = require("../models/exam");
const School = require("../models/school");
const sendError = require("../utils/sendError");
const { SUPERUSER, SCHOOL_ADMIN } = require("../models/user");

exports.getAll = async (req, res) => {
  const user = req.user;
  let { schoolId } = req.body;

  if (user.role === SUPERUSER && !isValidObjectId(schoolId))
    return sendError(res, "Invalid schoolId");
  if (user.role === SCHOOL_ADMIN) schoolId = user.school.toString();

  let exams = await Exam.find({ school: schoolId })
    .select("year month date")
    .lean();

  exams = exams.map((exam) => {
    return { _id: exam._id, exam: `${exam.year}-${exam.month}-${exam.date}` };
  });

  return res.json({ exams });
};

exports.create = async (req, res) => {
  const { schoolId, year, month, date } = req.body;

  if (!isValidObjectId(schoolId)) return sendError(res, "Invalid schoolId");

  const school = await School.exists({ _id: schoolId });
  const newExam = new Exam({ school: school._id, year, month, date });
  try {
    newExam.save();
  } catch (error) {
    return sendError(res, error);
  }

  return res.json({ examId: newExam._id });
};
