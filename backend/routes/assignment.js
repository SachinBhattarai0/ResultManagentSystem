const { authenticateUser, allowedRoles } = require("../middlewares/validator");
const { TEACHER, SCHOOL_ADMIN, SUPERUSER } = require("../models/user");
const router = require("express").Router();
const {
  create,
  getAll,
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
router.post("/", authenticateUser, allowedRoles(TEACHER), getAll);
router.post("/student-list/", authenticateUser, studentList);

module.exports = router;
