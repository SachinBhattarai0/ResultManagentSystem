const router = require("express").Router();
const { createSchool } = require("../controllers/school");
const { schoolValidator, validate } = require("../middlewares/validator");

router.post("/create/", schoolValidator, validate, createSchool);

module.exports = router;
