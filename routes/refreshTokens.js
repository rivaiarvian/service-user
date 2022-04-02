const express = require("express");
const router = express.Router();
const { create, getToken } = require("../controller/RefreshTokens");

router.post("/", create);
router.get("/", getToken);

module.exports = router;
