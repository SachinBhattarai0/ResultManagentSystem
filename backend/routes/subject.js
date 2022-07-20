const router = require("express").Router();
const { create } = require("../controllers/subject");
const {
  authenticateUser,
  OnlySuperUserOrSchoolAdmin,
} = require("../middlewares/validator");

router.post("/create/", authenticateUser, OnlySuperUserOrSchoolAdmin, create);

module.exports = router;
