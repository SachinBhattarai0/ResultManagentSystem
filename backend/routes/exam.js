const { create, getAll } = require("../controllers/exam");
const { authenticateUser, allowedRoles } = require("../middlewares/validator");
const { SUPERUSER, SCHOOL_ADMIN } = require("../models/user");
const router = require("express").Router();

router.post(
  "/create/",
  authenticateUser,
  allowedRoles([SCHOOL_ADMIN, SUPERUSER]),
  create
);
router.post(
  "/get-all/",
  authenticateUser,
  allowedRoles([SCHOOL_ADMIN, SUPERUSER]),
  getAll
);
module.exports = router;
