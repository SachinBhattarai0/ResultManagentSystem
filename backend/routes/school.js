const router = require("express").Router();
const { createSchool } = require("../controllers/school");
const {
  schoolValidator,
  validate,
  userValidator,
  OnlySuperUser,
} = require("../middlewares/validator");

router.post(
  "/create/",
  schoolValidator,
  userValidator,
  OnlySuperUser,
  validate,
  createSchool
);

module.exports = router;
