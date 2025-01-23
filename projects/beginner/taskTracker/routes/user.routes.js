const express = require("express");
const { createUser, login } = require("../controllers/user.controller");
const router = express.Router();

// sign up
router.post("/signup", createUser);

// login
router.post("/login", login);

module.exports = router;
