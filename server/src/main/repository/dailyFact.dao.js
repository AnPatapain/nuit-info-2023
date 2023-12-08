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
        upVotes: [],
        downVotes: []
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
const addUpvote = async (profileId, id) => {
    const dailyFact = await DailyFact.findById(id)
    await DailyFact.updateOne(
        { _id: id },
        { $push: { upVotes: { profileId: profileId } } }
    );
    await dailyFact.save()
}
const removeUpvote = async (profileId, id) => {
    const dailyFact = await DailyFact.findById(id)
    await DailyFact.updateOne(
        { _id: id },
        { $pull: { upVotes: { profileId: profileId } } }
    );
    await dailyFact.save()
}

const addDownvote = async (profileId, id) => {
    const dailyFact = await DailyFact.findById(id)
    await DailyFact.updateOne(
        { _id: id },
        { $push: { downVotes: { profileId: profileId } } }
    );
    await dailyFact.save()
}

const removeDownvote = async (profileId, id) => {
    const dailyFact = await DailyFact.findById(id)
    await DailyFact.updateOne(
        { _id: id },
        { $pull: { downVotes: { profileId: profileId } } }
    );
    await dailyFact.save()
}
const isUpvote = async (profileId, id) => {
    const dailyFact = await DailyFact.findById(id);

    const isUpvote = dailyFact.upVotes.some(upVote => upVote.profileId.toString() === profileId.toString())
    return isUpvote;
}
const isDownvote = async (profileId, id) => {
    const dailyFact = await DailyFact.findById(id);

    const isDownvote = dailyFact.downVotes.some(downVote => downVote.profileId.toString() === profileId.toString());
    return isDownvote;
}
let dailyFactDAO = {
    createOne,
    findById,
    getAll,
    deleteById,
    getToday,
    getPage,
    getPageRandom,
    addUpvote,
    removeUpvote,
    addDownvote,
    removeDownvote,
    isUpvote,
    isDownvote,
}

module.exports = dailyFactDAO