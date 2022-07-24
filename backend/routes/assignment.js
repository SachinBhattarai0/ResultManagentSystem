const {
  create,
  getAll,
  studentList,
  getCompleted,
} = require("../controllers/assignment");
const {
  authenticateUser,
  OnlySuperUserOrSchoolAdmin,
  OnlyTeacher,
} = require("../middlewares/validator");
const router = require("express").Router();

router.post("/", authenticateUser, OnlyTeacher, getAll);
router.post("/completed/", authenticateUser, OnlyTeacher, getCompleted);
router.post("/create/", authenticateUser, OnlySuperUserOrSchoolAdmin, create);
router.post("/student-list/", authenticateUser, studentList);

module.exports = router;
