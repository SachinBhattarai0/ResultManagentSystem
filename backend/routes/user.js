const router = require("express").Router();
const { createUser, createAdmin, signIn } = require("../controllers/user");
const {
  userInfoValidator,
  roleValidator,
  validate,
  signInInfoValidator,
  OnlySuperUser,
  OnlySuperUserOrSchoolAdmin,
  authenticateUser,
} = require("../middlewares/validator");

//create superuser
// router.post('superuser/create',createsuperuser)

//For creating admin
router.post(
  "/admin/create/",
  authenticateUser,
  OnlySuperUser,
  userInfoValidator,
  validate,
  createAdmin
);
//For creating teacher or students
router.post(
  "/create/",
  authenticateUser,
  OnlySuperUserOrSchoolAdmin,
  userInfoValidator,
  createUser
);

router.post("/sign-in/", signInInfoValidator, validate, signIn);

module.exports = router;
