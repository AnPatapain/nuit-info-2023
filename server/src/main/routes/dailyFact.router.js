const express = require("express")
const router = express.Router()
const jwtAuth = require("../middleware/jwt.auth")
const roleAuth = require("../middleware/role.auth")
const multerUpload = require("../middleware/multer.upload")
const { dailyFact } = require("../model")

const dailyFactController = require("../controller").dailyFactController


router.route("/dailyFact")
    .post([jwtAuth, roleAuth.isUser, multerUpload.single], dailyFactController.createOne)

router.route("/dailyFact/me")
    .get([jwtAuth, roleAuth.isUser], dailyFactController.getAllCurrent)
router.route("/dailyFact/me/today")
    .get([jwtAuth, roleAuth.isUser], dailyFactController.getToday)
router.route("/dailyFact/all")
    .get([jwtAuth, roleAuth.isUser], dailyFactController.getAll)
router.route("/dailyFact/:dailyFactId")
    .get([jwtAuth, roleAuth.isUser], dailyFactController.getOne)
    .delete([jwtAuth, roleAuth.isUser], dailyFactController.deleteOne)
    .post([jwtAuth, roleAuth.isUser], dailyFactController.changeVote)
module.exports = router
