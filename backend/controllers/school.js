const School = require("../models/school");
const { SUPERUSER } = require("../models/user");

exports.createSchool = async (req, res) => {
  const user = req.user;
  if (user.role !== SUPERUSER)
    return sendError(res, "User does not have permission for the action", 401);

  const { name, address, contactNo } = req.body;
  const newSchool = new School({ name, address, contactNo });

  try {
    await newSchool.save();
  } catch (error) {
    return sendError(res, error);
  }

  res
    .status(201)
    .json({ message: "School creted Successfully", userId: newSchool._id });
};
