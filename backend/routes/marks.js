const { create } = require("../controllers/marks");
const { authenticateUser, OnlyTeacher } = require("../middlewares/validator");
const router = require("express").Router();

router.post("/create/", authenticateUser, OnlyTeacher, create);

module.exports = router;
