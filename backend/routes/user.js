const router = require("express").Router();
const {
  createTeacher,
  createStudent,
  createAdmin,
  signIn,
  verifyUser,
  createSuperuser,
} = require("../controllers/user");
const {
  userInfoValidator,
  validate,
  signInInfoValidator,
  OnlySuperUser,
  OnlySuperUserOrSchoolAdmin,
  authenticateUser,
} = require("../middlewares/validator");

//create superuser
router.post("/superuser/create/", userInfoValidator, createSuperuser);

router.post("/verify/", verifyUser);

//For creating admin
router.post(
  "/admin/create/",
  authenticateUser,
  OnlySuperUser,
  userInfoValidator,
  validate,
  createAdmin
);
//For creating teacher
router.post(
  "/teacher/create/",
  authenticateUser,
  OnlySuperUserOrSchoolAdmin,
  userInfoValidator,
  createTeacher
);
// For creatng student
router.post(
  "/student/create/",
  authenticateUser,
  OnlySuperUserOrSchoolAdmin,
  userInfoValidator,
  createStudent
);

router.post("/sign-in/", signInInfoValidator, validate, signIn);

module.exports = router;
