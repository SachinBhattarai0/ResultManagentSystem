const { User } = require("../models/user");
const sendError = require("../utils/sendError");
const School = require("../models/school");

exports.createUser = async (req, res) => {
  const { username, password, school, role } = req.body;

  if (!school && role !== "superUser")
    return sendError(res, "School must be present");

  const schoolItem = await School.find({ name: school });

  if (role !== "superuser" && !schoolItem)
    return sendError("School doesnot exist");

  const newUser = new User({
    username,
    password,
    school: schoolItem._id,
    role,
  });

  try {
    await newUser.save();
  } catch (error) {
    sendError(res, error);
  }

  return res
    .status(201)
    .json({ message: "User creted Successfully", userId: newUser._id });
};
