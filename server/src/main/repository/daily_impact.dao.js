const db = require("../model")
const DailyImpact = db.daily_impact

const createOne = async (data) => {
    return DailyImpact.create(data);
}

const getOneById = async (id) => {
    return await DailyImpact.findById(id);
}

const getAll = async () => {
    return DailyImpact.find();
}

let daily_impactDAO = {
    createOne,
    getOneById,
    getAll
}

module.exports = daily_impactDAO