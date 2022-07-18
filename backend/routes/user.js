const router = require("express").Router();
const { createUser, signIn } = require("../controllers/user");
const {
  userInfoValidator,
  validate,
  signInInfoValidator,
} = require("../middlewares/validator");

router.post("/create/", userInfoValidator, validate, createUser);
router.post("/sign-in/", signInInfoValidator, validate, signIn);

module.exports = router;
