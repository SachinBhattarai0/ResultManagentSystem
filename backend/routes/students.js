const {
  getStudentForAssignment,
  getStudentByExamAndClass,
} = require("../controllers/student");
const { authenticateUser, allowedRoles } = require("../middlewares/validator");
const { TEACHER, SCHOOL_ADMIN, SUPERUSER } = require("../models/user");
const router = require("express").Router();

router.post(
  "/get-for-assignment/",
  authenticateUser,
  allowedRoles(TEACHER),
  getStudentForAssignment
);
router.post(
  "/get-by-exam-and-class/",
  authenticateUser,
  allowedRoles([SUPERUSER, SCHOOL_ADMIN]),
  getStudentByExamAndClass
);

module.exports = router;
