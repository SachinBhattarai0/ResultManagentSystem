const router = require("express").Router();
const { createSchool } = require("../controllers/school");
const {
  schoolValidator,
  validate,
  authenticateUser,
  OnlySuperUser,
} = require("../middlewares/validator");

router.post(
  "/create/",
  schoolValidator,
  authenticateUser,
  OnlySuperUser,
  validate,
  createSchool
);

module.exports = router;
