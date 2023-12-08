const db = require("../model")
const lodash = require('lodash')
const DailyFact = db.dailyFact

const createOne = async (data) => {
    const newDailyFact = new DailyFact({
        fact: data.fact,
        image: data.image,
        profileId: data.profileId,
        title: data.title,
        upvote: 0,
        downvote: 0,
        comments: [],
        timeStamp: Date.now(),
    })
    await newDailyFact.save()
    return newDailyFact
}


const findById = async (id) => {
    return DailyFact.findById(id)
}
const getAll = async () => {
    return DailyFact.find()
}


const deleteById = async (id) => {
    const dailyFact = await DailyFact.findByIdAndDelete(id);
    return dailyFact
}
const getPageRandom = async (page, pageSize) => {
    const allDailyFact = await DailyFact.find()
    const shuffleDailyFact = lodash.shuffle(allDailyFact)
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize
    const paginatedDailyFacts = shuffleDailyFact.slice(startIndex, endIndex);
    return paginatedDailyFacts;
}
const getPage = async (page, pageSize) => {
    const dailyFacts = await DailyFact.aggregate([
        { $skip: pageSize * page },
        { $limit: pageSize }
    ]).exec();
    return dailyFacts
}
const getToday = async (ids) => {
    const today = Date.now();

    // Fetch the corresponding daily facts for today using the IDs
    const dailyFacts = await DailyFact.find({
        _id: { $in: ids },
    });

    // Filter daily facts based on the timestamp difference being less than 1 day
    const todayDailyFacts = dailyFacts.filter((fact) => {
        const timeDifference = today - fact.timeStamp;
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 1 day in milliseconds
        return timeDifference < oneDayInMilliseconds;
    });
    return todayDailyFacts
}
let dailyFactDAO = {
    createOne,
    findById,
    getAll,
    deleteById,
    getToday,
    getPage,
    getPageRandom,
}

module.exports = dailyFactDAO