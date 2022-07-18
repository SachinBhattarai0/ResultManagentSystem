const School = require("../models/school");

exports.createSchool = async (req, res) => {
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
