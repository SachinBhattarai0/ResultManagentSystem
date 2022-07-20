const { create } = require("../controllers/exam");
const {
  authenticateUser,
  OnlySuperUserOrSchoolAdmin,
} = require("../middlewares/validator");
const router = require("express").Router();

router.post("/create/", authenticateUser, OnlySuperUserOrSchoolAdmin, create);

module.exports = router;