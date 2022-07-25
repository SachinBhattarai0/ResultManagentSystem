const { create } = require("../controllers/exam");
const { authenticateUser, allowedRoles } = require("../middlewares/validator");
const { SUPERUSER, SCHOOL_ADMIN } = require("../models/user");
const router = require("express").Router();

router.post(
  "/create/",
  authenticateUser,
  allowedRoles([SCHOOL_ADMIN, SUPERUSER]),
  create
);

module.exports = router;
