const dailyImpactService = require("../service").daily_impactService
const profileService = require("../service/profile.service")

const getAll = async (req, res, next) => {
    try {
        const dailyImpacts = await dailyImpactService.getAll();
        return res.status(200).json(dailyImpacts);
    } catch (err) {
        next(err);
    }
};

const getMe = async (req, res, next) => {
    try {
        const profile = await profileService.getFromUserId(req.userId)

        const dailyImpacts = await Promise.all(profile.daily_impacts.map(async (impactId) => {
            return await dailyImpactService.getOne(impactId);
        }));

        return res.status(200).json(dailyImpacts);
    } catch (err) {
        next(err);
    }
};

const createOne = async (req, res, next) => {
    try {
        const { transportation, energy, digital_habit } = req.body;

        const dailyImpactData = {
            transportation,
            energy,
            digital_habit
        };

        const createdDailyImpact = await dailyImpactService.createOne(dailyImpactData, req.userId);

        res.status(201).json(createdDailyImpact);
    } catch (error) {
        next(error);
    }
};

const getToday = async (req, res, next) => {
    try {
        const daily_impacts = await dailyImpactService.getToday(req.userId)
        res.status(200).json(daily_impacts)
    }catch(err) {
        next(err)
    }
}

module.exports = {
    getAll,
    getMe,
    createOne,
    getToday
};
