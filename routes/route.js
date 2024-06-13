// .routes/database.js
const express = require("express");
const router = express.Router();

const getAllData = require("../controllers/database");

router.route("/").get(getAllData);

module.exports = router;

