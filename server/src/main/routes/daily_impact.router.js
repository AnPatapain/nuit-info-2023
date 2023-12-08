const express = require("express");
const router = express.Router();
const jwtAuth = require("../middleware/jwt.auth");
const roleAuth = require("../middleware/role.auth");

const dailyImpactController = require("../controller").daily_impactController;

router.route("/daily-impacts")
    .get([jwtAuth, roleAuth.isUser], dailyImpactController.getAll)
    .post([jwtAuth, roleAuth.isUser], dailyImpactController.createOne);

router.route("/daily-impacts/:dailyImpactId")
    .get([jwtAuth, roleAuth.isUser], dailyImpactController.getOne)

module.exports = router;
