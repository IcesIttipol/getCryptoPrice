const express = require("express");
const router = express.Router();
const ex = require("express-validator");
const { token } = require("../middleware/authen");
const Control = require("../modules/controllers/cryptoControl");

//register
router.post("/crypto/:time",[
    ex.body("symbol").notEmpty().isArray(),
    ex.body("target").notEmpty()
],token, Control.getCryptoPrice);

module.exports = router;
