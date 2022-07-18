const { create, getAll } = require("../controllers/assignment");
const {
  userValidator,
  OnlySuperUserOrSchoolAdmin,
} = require("../middlewares/validator");
const router = require("express").Router();

router.post("/", userValidator, getAll);
router.post("/create/", userValidator, OnlySuperUserOrSchoolAdmin, create);

module.exports = router;
