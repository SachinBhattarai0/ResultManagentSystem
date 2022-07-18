const router = require("express").Router();
const { createSchool } = require("../controllers/school");
const {
  schoolValidator,
  validate,
  userValidator,
} = require("../middlewares/validator");

router.post("/create/", schoolValidator, userValidator, validate, createSchool);

module.exports = router;
