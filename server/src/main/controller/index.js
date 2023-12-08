const controller = {
    authController: require("./auth.controller"),
    cloudinaryController: require("./cloudinary.controller"),
    profileController: require("./profile.controller"),
    userController: require("./user.controller"),
    projectController: require("./project.controller"),

    daily_impactController: require("./daily_impact.controller"),

    notificationController: require("./notification.controller"),
    dailyFactController: require('./dailyFact.controller')
}

module.exports = controller