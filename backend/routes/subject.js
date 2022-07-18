const router = require("express").Router();
const { create } = require("../controllers/subject");
const {
  userValidator,
  OnlySuperUserOrSchoolAdmin,
} = require("../middlewares/validator");

router.post("/create/", userValidator, OnlySuperUserOrSchoolAdmin, create);

module.exports = router;
