const mongoose = require('mongoose');

const dailyImpactSchema = new mongoose.Schema({
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
}, { timestamps: true });

const DailyImpact = mongoose.model('DailyImpact', dailyImpactSchema);

module.exports = DailyImpact;
