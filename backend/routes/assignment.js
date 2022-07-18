const { create, getAll } = require("../controllers/assignment");
const { userValidator } = require("../middlewares/validator");
const router = require("express").Router();

router.post("/", userValidator, getAll);
router.post("/create/", userValidator, create);

module.exports = router;
