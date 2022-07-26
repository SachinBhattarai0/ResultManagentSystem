const { authenticateUser, allowedRoles } = require("../middlewares/validator");
const { TEACHER, SCHOOL_ADMIN, SUPERUSER } = require("../models/user");
const router = require("express").Router();
const {
  create,
  getAllUserAssignments,
  getAllSchoolAssignments,
  studentList,
  getCompleted,
} = require("../controllers/assignment");

router.post(
  "/completed/",
  authenticateUser,
  allowedRoles(TEACHER),
  getCompleted
);
router.post(
  "/create/",
  authenticateUser,
  allowedRoles([SCHOOL_ADMIN, SUPERUSER]),
  create
);
router.post(
  "/school/",
  authenticateUser,
  allowedRoles([SCHOOL_ADMIN, SUPERUSER]),
  getAllSchoolAssignments
);
router.post(
  "/",
  authenticateUser,
  allowedRoles(TEACHER),
  getAllUserAssignments
);

module.exports = router;
