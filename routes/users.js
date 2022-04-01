const express = require("express");
const router = express.Router();
const { register, login, updateProfile } = require("../controller");

router.post("/register", register);
router.post("/sign-in", login);
router.put("/:id", updateProfile);

module.exports = router;
