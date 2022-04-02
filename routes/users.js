const express = require("express");
const router = express.Router();
const {
  register,
  login,
  updateProfile,
  getUserById,
  getUsers,
  logout,
} = require("../controller");

router.post("/register", register);
router.post("/sign-in", login);
router.post("/logout", logout);
router.put("/:id", updateProfile);
router.get("/:id", getUserById);
router.get("/", getUsers);

module.exports = router;
