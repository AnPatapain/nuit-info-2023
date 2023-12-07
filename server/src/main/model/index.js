
const { DB_ROLES } = process.env

const db = {
    user: require('./user'),
    role: require('./role'),
    profile: require('./profile'),
    project: require("./project"),
    notification: require("./notification"),
    dailyFact: require("./dailyFact").DailyFact,
    comment: require("./dailyFact").Comment,
    ROLES: DB_ROLES
}
module.exports = db