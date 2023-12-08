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

        const createdDailyImpact = await dailyImpactService.createOne(dailyImpactData);

        res.status(201).json(createdDailyImpact);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getOne,
    createOne
};
