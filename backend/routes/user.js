const router = require("express").Router();
const { createUser } = require("../controllers/user");
const { userValidator, validate } = require("../middlewares/validator");

router.post("/create/", userValidator, validate, createUser);

module.exports = router;
