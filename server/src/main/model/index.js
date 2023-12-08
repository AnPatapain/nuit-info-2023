
const { DB_ROLES } = process.env

const db = {
    user: require('./user'),
    role: require('./role'),
    profile: require('./profile'),
    project: require("./project"),
    notification: require("./notification"),
    daily_impact: require("./daily_impact"),
    ROLES: DB_ROLES
}
module.exports = db