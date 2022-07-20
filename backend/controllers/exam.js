const { isValidObjectId } = require("mongoose");
const Exam = require("../models/exam");
const School = require("../models/school");
const sendError = require("../utils/sendError");

exports.create = async (req, res) => {
  const { schoolId, year,month,date } = req.body;

  if (!isValidObjectId(schoolId)) return sendError(res, "Invalid schoolId");

  const school = await School.exists({ _id: schoolId });
  const newExam = new Exam({ school: school._id, year,month,date });
  try {
    newExam.save();
  } catch (error) {
    return sendError(res, error); //Change this
  }

  return res.json({ examId: newExam._id });
};
