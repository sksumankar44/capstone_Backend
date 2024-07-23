const express = require("express");
const router = express.Router();
const { gettransactions } = require("../Transaction/dbquery");

router.get("/gettransactions", gettransactions);

module.exports = router;
