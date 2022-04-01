const express = require("express");
const router = express.Router();
const {
  register,
  login,
  updateProfile,
  getUserById,
  getUsers,
} = require("../controller");

router.post("/register", register);
router.post("/sign-in", login);
router.put("/:id", updateProfile);
router.get("/:id", getUserById);
router.get("/", getUsers);

module.exports = router;
