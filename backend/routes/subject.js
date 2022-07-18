const router = require("express").Router();
const { create } = require("../controllers/subject");
const { userValidator } = require("../middlewares/validator");

router.post("/create/", userValidator, create);

module.exports = router;
