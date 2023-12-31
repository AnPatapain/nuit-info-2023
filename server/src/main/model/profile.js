const mongoose = require("mongoose")
const { Schema } = mongoose

const profileSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    dailyFacts: [
        { type: mongoose.Schema.ObjectId, ref: 'DailyFact', required: true }
    ],
    daily_impacts: [
        {type: mongoose.Schema.ObjectId, ref: 'DailyImpact', required: true}
    ],
    impact_points: { type: Number, default: 0 },
    comments: [
        {
            type: mongoose.Schema.ObjectId, ref: 'Comment', required: true
        }
    ],
    notificationSend: [{
        notificationId: { type: Schema.Types.ObjectId, ref: 'Notification', require: true }
    }],
    notificationReceived: [{
        notificationId: { type: Schema.Types.ObjectId, ref: 'Notification', require: true }
    }]
})

const Profile = mongoose.model("Profile", profileSchema)

module.exports = Profile