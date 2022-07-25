const router = require("express").Router();
const {
  createTeacher,
  createStudent,
  createAdmin,
  signIn,
  verifyUser,
  createSuperuser,
  getAll,
} = require("../controllers/user");
const {
  userInfoValidator,
  validate,
  signInInfoValidator,
  authenticateUser,
  allowedRoles,
} = require("../middlewares/validator");
const { SUPERUSER, SCHOOL_ADMIN } = require("../models/user");

//create superuser
router.post("/superuser/create/", userInfoValidator, createSuperuser);

router.post("/verify/", verifyUser);

router.post(
  "/get-all/",
  authenticateUser,
  allowedRoles([SCHOOL_ADMIN, SUPERUSER]),
  getAll
);

//For creating admin
router.post(
  "/admin/create/",
  authenticateUser,
  allowedRoles(SUPERUSER),
  userInfoValidator,
  validate,
  createAdmin
);
//For creating teacher
router.post(
  "/teacher/create/",
  authenticateUser,
  allowedRoles([SUPERUSER, SCHOOL_ADMIN]),
  userInfoValidator,
  createTeacher
);
// For creatng student
router.post(
  "/student/create/",
  authenticateUser,
  allowedRoles([SUPERUSER, SCHOOL_ADMIN]),
  userInfoValidator,
  createStudent
);

router.post("/sign-in/", signInInfoValidator, validate, signIn);

module.exports = router;
