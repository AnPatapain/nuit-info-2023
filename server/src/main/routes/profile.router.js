const express = require("express")
const router = express.Router()
const profileController = require("../controller/").profileController
const jwtAuth = require("../middleware/jwt.auth")
const roleAuth = require("../middleware/role.auth")
const multerUpload = require("../middleware/multer.upload")



// No need to include method names in the route paths
router.route("/profile")
    .post([jwtAuth, roleAuth.isUser, multerUpload.single], profileController.createOne)

router.route("/profile/me")
    .get([jwtAuth, roleAuth.isUser], profileController.getCurrent)
    .put([jwtAuth, roleAuth.isUser, multerUpload.single], profileController.updateOne)

router.route("/profile/:profileId")
    .get([jwtAuth, roleAuth.isUser], profileController.getOne)
    .delete([jwtAuth, roleAuth.isUser], profileController.deleteOne)


module.exports = router