const express = require("express");

const router = express.Router();
const donorRoute = require("../controllers/donorController");

router.route("/").get(donorRoute.getAllDonors);

module.exports = router;
