const express = require('express');
const router = express.Router();

const { login} = require("../controllers/login")

// post --->> create

router.post("/user/login", login);

module.exports = router;