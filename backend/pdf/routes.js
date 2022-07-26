const express = require("express");
const router = express.Router();
const { authenticateUser, allowedRoles } = require("../middlewares/validator");
const { SCHOOL_ADMIN, SUPERUSER } = require("../models/user");
const { getStudentMarksheet, getClassMarksheet } = require("./controllers");

router.post(
  "/student/",
  authenticateUser,
  allowedRoles([SCHOOL_ADMIN, SUPERUSER]),
  getStudentMarksheet
);

router.post(
  "/class/",
  authenticateUser,
  allowedRoles([SCHOOL_ADMIN, SUPERUSER]),
  getClassMarksheet
);

module.exports = router;
