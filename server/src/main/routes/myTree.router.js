const express = require("express")
const router = express.Router()
const jwtAuth = require("../middleware/jwt.auth")
const roleAuth = require("../middleware/role.auth")

const profileService = require("../service").profileService



// No need to include method names in the route paths
router.route("/get-tree-level")
    .get([jwtAuth, roleAuth.isUser], async (req, res, next) => {
        const profile = await profileService.getFromUserId(req.userId)
        const impact_points = profile.impact_points

        let tree_level = 0
        if(0 < impact_points <= 20) {
            tree_level = 20
        }
        else if(20 < impact_points <= 40) {
            tree_level = 40
        }

        else if(40 < impact_points <= 60) {
            tree_level = 60
        }

        else if(60 < impact_points <= 80) {
            tree_level = 80
        }
        else if(80 < impact_points <= 100) {
            tree_level = 100
        }

        res.status(200).json(tree_level)
    })


module.exports = router