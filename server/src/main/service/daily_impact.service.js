const dailyImpactDAO = require("../repository").daily_impactDAO
const profileService = require("../service/profile.service")
const DailyFactError = require("../errors/DailyFactError");

let getAll = async () => {
    return await dailyImpactDAO.getAll();
};

let getOne = async (id) => {
    return await dailyImpactDAO.getOneById(id);
};

const getToday = async (userId) => {
    const profile = await profileService.getFromUserId(userId)
    const daily_impact_ids = profile.daily_impacts.map(daily_impact => daily_impact._id)
    return await dailyImpactDAO.getToday(daily_impact_ids)
}

let createOne = async (dailyImpactData, userId) => {
    // const todayDailyFact = await getToday(data.profileId)
    // if (todayDailyFact.length > 0) {
    //     throw new DailyFactError("you already create a FACTOS in the previous 24h")
    // }

    const profile = await profileService.getFromUserId(userId)
    const dailyImpact = await dailyImpactDAO.createOne(dailyImpactData)

    profile.daily_impacts.push(dailyImpact._id)
    profile.impact_points = profile.impact_points + calculateImpactScore(dailyImpact)
    dailyImpact.impact_points = calculateImpactScore(dailyImpact)
    dailyImpact.profileId = profile._id

    await profile.save()
    console.log("profile", profile)
    return await dailyImpact.save()
};

const calculateImpactScore = (daily_impact) => {
    let impactScore = 0;

    // Transportation
    impactScore += (daily_impact.transportation.public_transport_km / 10) * 10;
    impactScore += daily_impact.transportation.walking_km * 5;
    impactScore -= (daily_impact.transportation.car_km / 10) * 2;

    // Energy Usage
    impactScore -= daily_impact.energy.air_conditioner_hour * 5;
    impactScore -= daily_impact.energy.lighting_hour * 0.5;

    // Digital Habit
    impactScore += daily_impact.digital_habit.delete_spam_email_numbers * 0.1;
    impactScore += daily_impact.digital_habit.eco_search_engine_hour * 5;

    return impactScore;
};

let dailyImpactService = {
    getAll,
    getOne,
    getToday,
    createOne,
    calculateImpactScore
};

module.exports = dailyImpactService;
