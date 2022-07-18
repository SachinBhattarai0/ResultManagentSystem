const { create } = require("../controllers/class");
const { userValidator } = require("../middlewares/validator");
const router = require("express").Router();

router.post("/create/", userValidator, create);

module.exports = router;
