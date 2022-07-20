const { create, getAll } = require("../controllers/assignment");
const {
  authenticateUser,
  OnlySuperUserOrSchoolAdmin,
} = require("../middlewares/validator");
const router = require("express").Router();

router.post("/", authenticateUser, getAll);
router.post("/create/", authenticateUser, OnlySuperUserOrSchoolAdmin, create);

module.exports = router;
