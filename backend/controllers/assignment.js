const Assignment = require("../models/assignment");
const { SUPERUSER, SCHOOL_ADMIN } = require("../models/user");
const sendError = require("../utils/sendError");

exports.getAll = (req, res) => {};

exports.create = (req, res) => {
  const user = req.user;
  if (user.role !== SUPERUSER && user.role !== SCHOOL_ADMIN)
    return sendError(res, "User does not have permission for the action", 401);

  const { school, className, subject, to } = req.body;

  const newAssignment = new Assignment(school, className, subject, to);
  try {
    newAssignment.save();
  } catch (error) {
    return sendError(res, error); //Change this
  }

  return res.json({ assignmentId: newAssignment._id });
};
