const dailyImpactService = require("../service").daily_impactService

const getAll = async (req, res, next) => {
    try {
        const dailyImpacts = await dailyImpactService.getAll();
        return res.status(200).json(dailyImpacts);
    } catch (err) {
        next(err);
    }
};

const getOne = async (req, res, next) => {
    try {
        const dailyImpactId = req.params.dailyImpactId;
        const dailyImpact = await dailyImpactService.getOne(dailyImpactId);
        return res.status(200).json(dailyImpact);
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

        console.log(dailyImpactData)
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
    getOne,
    createOne,
    getToday
};
