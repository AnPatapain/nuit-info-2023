const dailyImpactDAO = require("../repository").daily_impactDAO

let getAll = async () => {
    return await dailyImpactDAO.getAll();
};

let getOne = async (id) => {
    return await dailyImpactDAO.getOneById(id);
};

let createOne = async (dailyImpactData) => {
    return await dailyImpactDAO.createOne(dailyImpactData);
};

let dailyImpactService = {
    getAll,
    getOne,
    createOne
};

module.exports = dailyImpactService;
