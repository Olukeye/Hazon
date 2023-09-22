const express = require("express");

const router = express.Router();
const donorRoute = require("../controllers/donorController");
const { authenticateUser, authorize } = require("../middleware/authentication");

router.route("/").get(donorRoute.getAllDonors);

module.exports = router;
