const express = require("express");
const {  saveLog } = require("../controllers/log");


const router = express.Router();

router.route("/").post(saveLog);

module.exports = router;
