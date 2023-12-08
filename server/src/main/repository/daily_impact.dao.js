const db = require("../model")
const DailyImpact = db.daily_impact

const createOne = async (data) => {
    data.timeStamp = Date.now();
    return DailyImpact.create(data);
}

const getOneById = async (id) => {
    return await DailyImpact.findById(id);
}

const getAll = async () => {
    return DailyImpact.find();
}

const getToday = async (ids) => {
    const today = Date.now();

    // Fetch the corresponding daily facts for today using the IDs
    const daily_impacts = await DailyImpact.find({
        _id: { $in: ids },
    });

    // Filter daily facts based on the timestamp difference being less than 1 day
    return daily_impacts.filter((daily_impact) => {
        const timeDifference = today - daily_impact.timeStamp;
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 1 day in milliseconds
        return timeDifference < oneDayInMilliseconds;
    });
}

let daily_impactDAO = {
    createOne,
    getOneById,
    getAll,
    getToday
}

module.exports = daily_impactDAO