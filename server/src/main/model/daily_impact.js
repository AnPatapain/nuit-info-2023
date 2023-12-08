const mongoose = require('mongoose');

const dailyImpactSchema = new mongoose.Schema({
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', require: true },
    transportation: {
        public_transport_km: Number,
        walking_km: Number,
        car_km: Number,
    },
    energy: {
        air_conditioner_hour: Number,
        lighting_hour: Number,
    },
    digital_habit: {
        delete_spam_email_numbers: Number,
        eco_search_engine_hour: Number,
    },
    impact_points: { type: Number, default: 0 },
    timeStamp: { type: Date, required: true }
});

const DailyImpact = mongoose.model('DailyImpact', dailyImpactSchema);

module.exports = DailyImpact;