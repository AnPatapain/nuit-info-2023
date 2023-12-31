const express = require("express")
const routes = express.Router()
const userRouter = require("./user.router")
const authRouter = require("./auth.router")
const projectRouter = require("./project.router")
const notificationRouter = require("./notification.router")
const profileRouter = require("./profile.router")
const daily_impactRouter = require("./daily_impact.router")
const dailyFactRouter = require("./dailyFact.router")
const myTreeRouter = require("./myTree.router")

routes.use(authRouter)
routes.use(userRouter)
routes.use(profileRouter)
routes.use(projectRouter)
routes.use(notificationRouter)

routes.use(daily_impactRouter)
routes.use(dailyFactRouter)
routes.use(myTreeRouter)

module.exports = routes