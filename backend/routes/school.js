const router = require("express").Router();
const { createSchool } = require("../controllers/school");
const { SUPERUSER } = require("../models/user");
const {
  schoolValidator,
  validate,
  authenticateUser,
  allowedRoles,
} = require("../middlewares/validator");

router.post(
  "/create/",
  schoolValidator,
  authenticateUser,
  allowedRoles(SUPERUSER),
  validate,
  createSchool
);

module.exports = router;
