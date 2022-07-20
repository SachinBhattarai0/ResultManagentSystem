const { create, getAll ,assignmentInfo} = require("../controllers/assignment");
const {
  authenticateUser,
  OnlySuperUserOrSchoolAdmin,
} = require("../middlewares/validator");
const router = require("express").Router();

router.post("/", authenticateUser, getAll);
router.post("/create/", authenticateUser, OnlySuperUserOrSchoolAdmin, create);
router.post('/:assignmentId/',authenticateUser,assignmentInfo)

module.exports = router;
