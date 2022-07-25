const { create } = require("../controllers/marks");
const { authenticateUser, allowedRoles } = require("../middlewares/validator");
const { TEACHER } = require("../models/user");
const router = require("express").Router();

router.post("/create/", authenticateUser, allowedRoles(TEACHER), create);

module.exports = router;
