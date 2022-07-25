const router = require("express").Router();
const { create } = require("../controllers/subject");
const { authenticateUser, allowedRoles } = require("../middlewares/validator");
const { SUPERUSER, SCHOOL_ADMIN } = require("../models/user");

router.post(
  "/create/",
  authenticateUser,
  allowedRoles([SUPERUSER, SCHOOL_ADMIN]),
  create
);

module.exports = router;
