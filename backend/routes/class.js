const { create } = require("../controllers/class");
const {
  userValidator,
  OnlySuperUserOrSchoolAdmin,
} = require("../middlewares/validator");
const router = require("express").Router();

router.post("/create/", userValidator, OnlySuperUserOrSchoolAdmin, create);

module.exports = router;
